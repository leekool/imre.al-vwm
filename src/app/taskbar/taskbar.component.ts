import { AfterViewInit, Component, } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements AfterViewInit {
  // @Input() windowList: Window[];
  constructor(public windowService: WindowService) { }

  async readWindows() {
    const windows = await this.windowService.getWindows();
    return windows;
  }

  async ngAfterViewInit() {
    console.log(await this.readWindows());
  }
}
