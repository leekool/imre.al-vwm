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

  toggleFocus(window: WindowComponent) {
    window.focus = !window.focus;
    for (let x of this.windows) {
      if (!window.focus && window._title !== x._title && !x.minimised) {
        x.focus = true;
        break;
      } else if (window.focus && window._title !== x._title) {
        x.focus = false;
      }
    }
  }

  constructor() { }
}
