import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { WindowService } from './window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'imre.al';

  constructor(public windowService: WindowService) { }

  @ViewChildren(WindowComponent) windows: QueryList<WindowComponent>;

  ngAfterViewInit() {
    this.windowService.setWindows(this.windows);
  }
}
