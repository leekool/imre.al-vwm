import { Component, Input } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent {
  @Input() set position(input: Position) {
    const isValid = positionClassList.includes(input);
    this._position = 'position-' + isValid ? input : 'centre';
  }

  @Input() set title(input: string) {
    this._title = input;
    this.taskbarIcon = `assets/icons/${this._title}-icon.png`
    this.setDesktopIcon()
  }

  @Input() minimised: boolean = false;
  @Input() maximised: boolean = true;
  @Input() closed: boolean = false;

  _position: string = '';
  _title: string = ''
  highlight: boolean = false;
  desktopIcon: string = '';
  taskbarIcon: string = '';

  constructor(public windowService: WindowService) { }


  toggleMinimise() {
    this.minimised = !this.minimised;
  }

  toggleResize() {
    this.maximised = !this.maximised;
  }

  toggleClose() {
    this.closed = !this.closed;
  }

  toggleHighlight() {
    this.highlight = !this.highlight;
    this.setDesktopIcon();
  }

  setDesktopIcon() {
    this.desktopIcon = this.highlight
      ? `assets/icons/${this._title}-desktop-icon-highlight.png`
      : `assets/icons/${this._title}-desktop-icon.png`;
  }
}

type Position = 'centre' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
const positionClassList: Array<Position> = ['centre', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
