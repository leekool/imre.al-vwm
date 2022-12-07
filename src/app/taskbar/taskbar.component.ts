import { Component, Input, OnInit } from '@angular/core';
import { Window } from '../window/window';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  @Input() windowList: Window[];

  ngOnInit() {
    console.log(this.windowList);
  }
}
