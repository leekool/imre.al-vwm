import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  @Input() windowList: string[];

  ngOnInit() {
    console.log(this.windowList);
  }
}
