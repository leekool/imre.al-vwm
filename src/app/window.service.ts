import { Injectable, QueryList } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  windows: QueryList<WindowComponent>;

  updateWindows$ = new Observable<QueryList<WindowComponent>>((observer) => {
    observer.next(this.windows);
  });

  windows$ = new Subject();

  focusElement: any;

  getFocus(window: WindowComponent) {
    window.focus = true;
    for (let x of this.windows) {
      if (window._title !== x._title) x.focus = false;
    }
  }

  dropFocus(window: WindowComponent) {
    window.focus = false;
    for (let x of this.windows) {
      if (window._title !== x._title && !x.minimised) {
        x.focus = true;
        break;
      }
    }
  }

  constructor() { }
}
