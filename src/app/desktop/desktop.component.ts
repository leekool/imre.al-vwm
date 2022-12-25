import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})

export class DesktopComponent implements OnInit {
  windowList: any;

  constructor(public windowService: WindowService) { }

  clearHighlight() {
    for (let window of this.windowList) if (window.highlight) window.toggleHighlight();
  }

  doubleClick(window: WindowComponent) {
    if (window.minimised) window.toggleMinimise();
    if (window.closed) window.toggleClose();
  }

  ngOnInit() {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
    this.windowService.oneFocus();
  }

}
