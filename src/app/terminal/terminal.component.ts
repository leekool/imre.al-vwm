import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from '../window.service';
import { WindowComponent } from '../window/window.component';
import { cloneDeep } from 'lodash'

@Component({
  selector: 'terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('cli') cli: ElementRef;
  @ViewChild('input') input: ElementRef;

  directory: string = '~';
  windowList: WindowComponent[] = [];
  inputCommands: any[] = [];

  commands: { name: string, run: (x?: string) => void, input?: string, output?: string, validArgs?: any, valid?: boolean }[] = [
    {name: 'clear',
     run: () => this.inputCommands.length = 0},
    {name: 'shutdown',
     run: () => this.router.navigate(['/shutdown'])},
    {name: 'echo',
     run: function(input) { this.output = input }},
    {name: 'kill',
     run: (input) => {
       if (!input) return 'kill: not enough arguments';
       if (!this.windowList.some(window => window._title == input)) return `kill: cannot find process "${input}"`;

       this.windowList.forEach(window => {
         if (!window.closed && window._title == input) window.toggleClose();
       });

       return;
     },
     validArgs: () => this.windowList.map(x => x._title)}
  ];

  constructor(private windowService: WindowService,
              private _parent: WindowComponent,
              private router: Router) { }

  validCommand(input: string): boolean {
    const arrInput = input.split(' ');
    const command = arrInput[0];
    const args = arrInput.length > 1 ? arrInput.slice(1).join(' ') : '';

    for (let x of this.commands) {
      if (command === x.name) {
        if (arrInput.length <= 1) return true;
        if (!x.validArgs) return true;
        if (x.validArgs().includes(args)) return true;
      }
    }

    return false;
  }

  onEnter(input: HTMLSpanElement) {
    // prevent contenteditable adding <div> on chrome
    document.execCommand('insertLineBreak');
    event?.preventDefault();

    // remove <br> created by contenteditable
    if (input.children[input.children.length - 1].tagName == 'BR') input.children[input.children.length - 1].remove();

    if (!input.textContent) return;

    const command = input.textContent.split(' ')[0].trim();
    const commandArgs = input.textContent.split(' ').slice(1).join(' ');

    if (!this.commands.some(x => x.name === command)) {
      this.inputCommands.push({ name: command, input: commandArgs, valid: false });
      input.textContent = '';
      return;
    }

    for (let x of this.commands) {
      if (command === x.name) {
        x.valid = this.validCommand(input.textContent);

        x.input = commandArgs;
        x.run(x.input);

        this.inputCommands.push(cloneDeep(x));

      }
    }

    this.cli.nativeElement.scrollTop = this.cli.nativeElement.scrollHeight - this.cli.nativeElement.clientHeight;
    input.textContent = '';
  }

  ngAfterViewInit(): void {
    this.windowService.pushFocusElement(this._parent, this.input);
  }

  ngOnInit(): void {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
  }
}
