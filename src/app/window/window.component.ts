import { Component, Input } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent {
  @Input() title: string = '';
  @Input() maximised: boolean = true;

  minimised: boolean = false;
  closed: boolean = false;

  constructor(public windowService: WindowService) {}


  toggleMinimise() {
    this.minimised = !this.minimised;
  }

  toggleResize() {
    this.maximised = !this.maximised;
  }

  toggleClose() {
    this.closed = !this.closed;
  }

  // title: string = '';
  // highlight: boolean = false;
  // desktopIcon: string = '';
  //
  // constructor(title: string) {
  //     this.title = title;
  //     this.setDesktopIcon();
  // }
  //
  // setDesktopIcon() {
  //     this.desktopIcon = this.highlight
  //         ? `assets/icons/${this.title}-desktop-icon-highlight.png`
  //         : `assets/icons/${this.title}-desktop-icon.png`;
  // }
  //
  // toggleHighlight() {
  //     this.highlight = !this.highlight;
  //     this.setDesktopIcon();
  // }
}
