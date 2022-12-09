import { Injectable, QueryList } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { Window } from './window/window';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  windows: QueryList<WindowComponent>;
  windowList: Window[] = [];

  public setWindows(value: QueryList<WindowComponent>) {
    this.windows = value;
  }

  public getWindows() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.windows));
    });
  }

  showWindowList = () => {
    for (let x of this.windows) this.windowList.push({
      title: x['title'],
      icon: `assets/icons/${x['title']}-icon.png`
    });
    console.log(this.windowList);
    return this.windowList;
  }

  constructor() { }
}
