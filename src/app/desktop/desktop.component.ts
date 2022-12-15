import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { Window } from '../window.model'
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})

export class DesktopComponent implements OnInit {
  windowList: any;

  imreal: Window = new Window('imre.al');

  doubleClick(w: Window) {
    let window: WindowComponent;
    for (let x of this.windowList) {
      if (w.title = x.title) window = x;
    }
    if (window!.minimised) window!.toggleMinimise();
    if (window!.closed) window!.toggleClose();
  }

  unhighlight() {
    if (this.imreal.highlight) this.imreal.toggleHighlight();
  }

  constructor(public windowService: WindowService) { }

  ngOnInit() {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
  }

}
