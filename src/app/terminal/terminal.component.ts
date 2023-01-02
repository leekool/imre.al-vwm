import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { WindowService } from '../window.service';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements AfterViewInit {
  @ViewChild('command') commandLineInput: ElementRef;

  constructor(private windowService: WindowService,
              private _parent: WindowComponent) { }

  onEnter(command: HTMLInputElement) {
    console.log(command);
    command.value = '';
  }

  ngAfterViewInit(): void {
    this.windowService.pushFocusElement(this._parent, this.commandLineInput)
  }

}
