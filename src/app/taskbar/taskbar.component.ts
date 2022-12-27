import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  windowList: WindowComponent[];

  constructor(public windowService: WindowService) { }

  iconmanPress(window: WindowComponent) {
    if (!window.focus && !window.minimised) {
      this.windowService.toggleFocus(window);
    } else {
      window.minimised = !window.minimised;
      this.windowService.toggleFocus(window);
    }
    // if (window.focus && !window.minimised) {
    //   window.toggleMinimise();
    // } else if (!window.focus && !window.minimised) {
    //   this.windowService.toggleFocus(window);
    // } else if (window.minimised) {
    //   window.toggleMinimise();
    // }
  }

  ngOnInit() {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
  }

}
