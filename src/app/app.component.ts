import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { WindowComponent } from './window/window.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'imre.al';
  windowList: string[] = [];

  @ViewChildren(WindowComponent) windows: QueryList<WindowComponent>;

  ngAfterViewInit() {
    for (let x of this.windows) this.windowList.push(x["title"]);
  }
}
