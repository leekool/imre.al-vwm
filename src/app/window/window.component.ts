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
    this._position = 'position-' + (isValid ? input : 'centre');
  }

  @Input() set title(input: string) {
    this._title = input;
    this.taskbarIcon = `assets/icons/${this._title}-icon.png`
    this.setDesktopIcon()
  }

  @Input() minimised: boolean = false;
  @Input() maximised: boolean = true;
  @Input() closed: boolean = false;
  @Input() focus: boolean = false;

  _position: string = 'position-centre';
  _title: string = ''
  highlight: boolean = false;
  desktopIcon: string = '';
  taskbarIcon: string = '';

  constructor(public windowService: WindowService) { }

  toggleMinimise() {
    this.minimised = !this.minimised;
    if (this.focus || !this.minimised) this.windowService.toggleFocus(this);
  }

  toggleResize() {
    this.maximised = !this.maximised;
  }

  toggleClose() {
    this.closed = !this.closed;
    if (this.focus || !this.closed) this.windowService.toggleFocus(this);
  }

  getFocus() {
    if (!this.focus) this.windowService.toggleFocus(this);
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

type Position = 'centre' | 'left' | 'right' | 'top' | 'bottom';
const positionClassList: Array<Position> = ['centre', 'left', 'right', 'top', 'bottom'];
