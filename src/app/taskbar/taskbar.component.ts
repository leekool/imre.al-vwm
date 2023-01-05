import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WindowService } from '../window.service';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  windowList: WindowComponent[];
  @ViewChild('startMenu') startMenu: ElementRef;

  constructor(public windowService: WindowService) { }

  iconmanPress(window: WindowComponent) {
    if (!window.focus && !window.minimised) {
      this.windowService.getFocus(window);
    } else {
      window.toggleMinimise();
    }
  }

  startMenuPress(window: WindowComponent) {
    if (window.minimised) window.toggleMinimise();
    if (window.closed) window.toggleClose();
    if (!window.closed) this.windowService.getFocus(window);
  }

  ngOnInit() {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
  }

}
