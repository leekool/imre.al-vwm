import { Component, Input } from '@angular/core';

@Component({
  selector: 'window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent {
  @Input() title: string = '';

  minimised: boolean = false;
  maximised: boolean = true;

  constructor() {}

  minimiseWindow() {
    this.minimised = !this.minimised;
  }

  toggleResize() {
    this.maximised = !this.maximised;
  }
}
