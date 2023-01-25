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

  commands: { name: string,
              run: (input?: string, windowList?: WindowComponent[]) => void,
              input?: string,
              output?: string,
              validArgs?: () => string[],
              valid?: boolean }[] = [
    {
      name: 'clear',
      run: () => this.inputCommands.length = 0
    },
    {
      name: 'shutdown',
      run: () => this.router.navigate(['/shutdown'])
    },
    {
      name: 'echo',
      run: function(input) { this.output = input }
    },
    {
      name: 'kill',
      run: function(input, windowList = []) {
        if (!input || !this.validArgs) {
          this.valid = false;
          return this.output = 'kill: not enough arguments';
        }

        if (!this.validArgs().some((window: unknown) => window == input)) return this.output = `kill: cannot find process "${input}"`;

        windowList.filter(x => x._title == input)[0].toggleClose();
      },
      validArgs: () => this.windowList.filter(x => !x.closed).map(x => x._title)
    },
    {
      name: 'pwd',
      run: function() { this.output = '/home/you' }
    }
  ];

  constructor(private windowService: WindowService,
              private _parent: WindowComponent,
              private router: Router) { }

  validCommand(input: string): boolean {
    const arrInput = input.split(' ');
    const command = arrInput[0];
    const args = arrInput.length > 1 ? arrInput.slice(1).join(' ') : '';

    for (let x of this.commands) {
      if (command !== x.name) continue;
      if (arrInput.length <= 1 || !x.validArgs || x.validArgs().includes(args)) return true;
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

    // refactor into command handling function
    for (let x of this.commands) {
      if (command !== x.name) continue;

      x.valid = this.validCommand(input.textContent);
      x.input = commandArgs;
      x.run(x.input, this.windowList);
      this.inputCommands.push(cloneDeep(x));
      x.output = '';
    }

    this.cli.nativeElement.scrollTop = this.cli.nativeElement.scrollHeight - this.cli.nativeElement.clientHeight;
    input.textContent = '';
  }

  ngAfterViewInit(): void {
    this.windowService.pushFocusElement(this._parent, this.input);

    setTimeout(() => {
      this.windowList.forEach(window => {
        this.commands.push({
          name: window._title,
          run: () => {
            if (window.minimised) window.toggleMinimise();
            if (window.closed) window.toggleClose();
            if (!window.closed) this.windowService.getFocus(window);
          }
        });
      });
    })
  }

  ngOnInit(): void {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
  }
}
