import { AfterViewInit, Component, } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements AfterViewInit {
  windows: any = this.windowService.getWindows();

  constructor(public windowService: WindowService) { }

  ngAfterViewInit() {
  }
}
