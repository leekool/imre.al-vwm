import { Component, ElementRef, Input, OnDestroy, Output } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent {
  @Input() title: string = '';

  minimised: boolean = false;
  maximised: boolean = true;

  constructor(public windowService: WindowService,
              private host: ElementRef<HTMLElement>) {}

  minimiseWindow() {
    this.minimised = !this.minimised;
  }

  toggleResize() {
    this.maximised = !this.maximised;
  }

  destroyWindow() {
    this.host.nativeElement.remove();
  }


}
