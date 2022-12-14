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

  // toggleClose() {
  //   this.closed = !this.closed;
  // }


}
