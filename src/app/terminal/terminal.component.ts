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
  windowList: WindowComponent[];
  inputCommands: any[] = [];

  commands: { name: string, run: (x?: string) => (string | void), input?: string, output?: boolean }[] = [
    {name: 'clear',
     run: () => this.inputCommands.length = 0},
    {name: 'shutdown',
     run: () => this.router.navigate(['/shutdown'])},
    {name: 'echo',
     output: true,
     run: (input) => {return input}},
    {name: 'kill',
     run: (input) => {
       this.windowList.forEach(window => {
         if (!window.closed && window._title == input) window.toggleClose();
       });
     }}

  ];

  constructor(private windowService: WindowService,
              private _parent: WindowComponent,
              private router: Router) { }

  validCommand(input: string): boolean {
    return this.commands.some(e => e.name === input);
  }

  onEnter(input: HTMLSpanElement) {
    // prevent contenteditable adding <div> on chrome
    document.execCommand('insertLineBreak');
    event?.preventDefault();

    // remove <br> created by contenteditable
    if (input.children[input.children.length - 1].tagName == 'BR') input.children[input.children.length - 1].remove();

    if (!input.textContent) return;

    const command = input.textContent.split(' ')[0].trim();

    if (this.validCommand(command)) {
      for (let x of this.commands) {
        if (command === x.name) {
          x.input = input.textContent.split(' ').slice(1).join(' ');
          this.inputCommands.push(cloneDeep(x));
          x.run(x.input);
        }
      }
    } else {
      this.inputCommands.push({ name: input.textContent.trim() });
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
