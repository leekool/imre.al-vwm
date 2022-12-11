import { Component, ElementRef, Input, OnDestroy, Output } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent {
  @Input() title: string = '';
  icon: string = `assets/icons/${this.title}-icon.png`

  minimised: boolean = false;
  maximised: boolean = true;
  closed: boolean = false;

  constructor(public windowService: WindowService,
              ) {}

  minimiseWindow() {
    this.minimised = !this.minimised;
  }

  toggleResize() {
    this.maximised = !this.maximised;
  }

  closeWindow() {
    this.closed = true;
  }


}
