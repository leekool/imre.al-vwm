import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';
import { Window } from '../window/window'

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})

export class DesktopComponent implements OnInit {
  windowList: any;

  desktopIcons = [{
    title: 'imre.al',
    highlight: false,
  }]

  imreal: Window = new Window('imre.al');

  constructor(public windowService: WindowService) { }

  ngOnInit() {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
  }

}
