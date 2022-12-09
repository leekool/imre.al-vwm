import { Injectable, QueryList } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { Window } from './window/window';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  windows: QueryList<WindowComponent>;

  public setWindows(value: QueryList<WindowComponent>) {
    this.windows = value;
  }

  public getWindows() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let windows = this.windows;
        let windowList: Window[] = [];
        windows.forEach(x => {
          windowList.push({'title': x.title,
                           'icon': `assets/icons/${x['title']}-icon.png`});
        });
        resolve(windowList);
      });
    });
  }

  constructor() { }
}
