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

  ngOnInit() {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
    });
  }

}
