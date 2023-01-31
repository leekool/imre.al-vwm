import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent implements AfterViewInit {
  @Input() set position(input: Position) {
    const isValid = positionClassList.includes(input);
    this._position = 'position-' + (isValid ? input : 'centre');
  }

  @Input() set title(input: string) {
    this._title = input;
    this.taskbarIcon = `assets/icons/${this._title}-icon-small.png`;
    this.setDesktopIcon();
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
  focusElement: ElementRef;

  constructor(public windowService: WindowService) { }

  getFocus() {
    this.windowService.getFocus(this);

    setTimeout(() => {
      if (this.focusElement) this.focusElement.nativeElement.focus();
    });
  }

  focusOrOpen() {
    if (this.minimised) this.toggleMinimise();
    if (this.closed) this.toggleClose();
    if (!this.closed) this.windowService.getFocus(this);
  }

  toggleMinimise() {
    this.minimised = !this.minimised;

    if (!this.minimised) this.windowService.getFocus(this);
    else this.windowService.dropFocus(this);
  }

  toggleResize() {
    this.maximised = !this.maximised;
  }

  toggleClose() {
    this.closed = !this.closed;

    if (!this.closed) this.windowService.getFocus(this);
    else this.windowService.dropFocus(this);
  }

  toggleHighlight() {
    this.highlight = !this.highlight;
    this.setDesktopIcon();
  }

  setDesktopIcon() {
    this.desktopIcon = this.highlight
      ? `assets/icons/${this._title}-icon-desktop-highlight.png`
      : `assets/icons/${this._title}-icon-desktop.png`;
  }

  ngAfterViewInit(): void {
    this.windowService.getFocusElement(this);
  }

}

type Position = 'centre' | 'left' | 'right' | 'top' | 'bottom';
const positionClassList: Position[] = ['centre', 'left', 'right', 'top', 'bottom'];
