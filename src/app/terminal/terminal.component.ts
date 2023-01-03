import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { WindowService } from '../window.service';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('cliBody') cliBody: ElementRef;
  @ViewChild('cliInput') cliInput: ElementRef;

  commandList: string[] = ['clear', 'echo'];

  lines: string[] = [];

  constructor(private windowService: WindowService,
              private _parent: WindowComponent) { }

  onEnter(cliInput: HTMLSpanElement) {
    if (!cliInput.textContent) return;

    this.lines.push(cliInput.textContent);
    this.cliBody.nativeElement.scrollTop = this.cliBody.nativeElement.scrollHeight - this.cliBody.nativeElement.clientHeight;

    // if (!commandList.includes(cliInput.textContent as Command)) return;

    switch (cliInput.textContent) {
      case 'clear':
        this.lines = [];
        break;
    }

    cliInput.textContent = '';
  }

  ngAfterViewInit(): void {
    this.windowService.pushFocusElement(this._parent, this.cliInput)
  }
}

// type Command = 'clear';
// const commandList: Command[] = ['clear'];

//   @Input() set position(input: Position) {
//     const isValid = positionClassList.includes(input);
//     this._position = 'position-' + (isValid ? input : 'centre');
//   }
