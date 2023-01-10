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
  inputCommands: any[] = [];

  commands: { name: string, run: (x?: string) => void, output?: string}[] = [
    {name: 'clear',
     run: () => this.inputCommands.length = 0},
    {name: 'shutdown',
     run: () => this.router.navigate(['/shutdown'])},
    {name: 'echo',
     run: () => console.log('penis'),
     output: 'penis'}
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

    if (this.validCommand(input.textContent.trim())) {
      for (let x of this.commands) {
        if (input.textContent.trim() === x.name) {
          x.run();
          this.inputCommands.push(x);
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
}
