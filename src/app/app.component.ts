import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { Window } from './window/window'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'imre.al';
  windowList: Window[] = [];

  @ViewChildren(WindowComponent) windows: QueryList<WindowComponent>;

  ngAfterViewInit() {
    for (let x of this.windows) this.windowList.push({
      title: x['title'],
      icon: `assets/icons/${x['title']}-icon.png`
      });

  }
}
