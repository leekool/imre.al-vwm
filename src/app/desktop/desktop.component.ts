import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { Window } from '../window.model'

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})

export class DesktopComponent implements OnInit {
  windowList: any;

  imreal: Window = new Window('imre.al');

  doubleClick(w: Window) {
    let window: any;
    for (let x of this.windowList) {
      if (w.title = x.title) window = x;
    }
    console.log(window);
  }

  constructor(public windowService: WindowService) { }

  ngOnInit() {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
  }

}
