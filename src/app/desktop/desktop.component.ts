import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  windowList: any

  constructor(public windowService: WindowService) { }

  ngOnInit() {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
  }

}
