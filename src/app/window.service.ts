import { Injectable, QueryList } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  windows: QueryList<WindowComponent>;

  updateWindows$ = new Observable<QueryList<WindowComponent>>((observer) => {
    observer.next(this.windows);
  });

  windows$ = new Subject();

  oneFocus(window: WindowComponent) {
    if (!window.focus) {
      window.focus = true;
      for (let x of this.windows) {
        if (window._title !== x._title) x.focus = false;
      }
    } else {
      window.focus = false;
      for (let x of this.windows) {
        if (window._title !== x._title) {
          x.focus = true;
          break;
        }
      }
    }
  }

  constructor() { }
}
