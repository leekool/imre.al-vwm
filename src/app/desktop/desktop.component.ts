import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})

export class DesktopComponent implements OnInit {
  windowList: WindowComponent[];

  constructor(public windowService: WindowService) { }

  clearHighlight() {
    this.windowList.forEach((window: WindowComponent) => {
      if (window.highlight) window.toggleHighlight();
    })
  }

  doubleClick(window: WindowComponent) {
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
