import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from '../window.service';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('cli') cli: ElementRef;
  @ViewChild('input') input: ElementRef;

  directory: string = '~';
  inputCommands: string[] = [];

  commands: { command: string, run: () => void }[] = [
    {command: 'clear',
     run: () => this.inputCommands.length = 0},
    {command: 'shutdown',
     run: () => this.router.navigate(['/shutdown'])}
  ];

  constructor(private windowService: WindowService,
              private _parent: WindowComponent,
              private router: Router) { }

  validCommand(input: string): boolean {
    return this.commands.some(e => e.command === input);
  }

  onEnter(input: HTMLSpanElement) {
    // prevent contenteditable adding <div> on chrome
    document.execCommand('insertLineBreak');
    event?.preventDefault();

    // remove <br> created by contenteditable
    if (input.children[input.children.length - 1].tagName == 'BR') input.children[input.children.length - 1].remove();

    if (!input.textContent) return;

    this.inputCommands.push(input.textContent);
    this.cli.nativeElement.scrollTop = this.cli.nativeElement.scrollHeight - this.cli.nativeElement.clientHeight;

    if (this.validCommand(input.textContent.trim())) {
      for (let x of this.commands) {
        if (input.textContent.trim() === x.command) x.run();
      }
    }

    input.textContent = '';
  }

  ngAfterViewInit(): void {
    this.windowService.pushFocusElement(this._parent, this.input)
  }
}

interface Command {
  command: string;
  run(x: any): void;
}
