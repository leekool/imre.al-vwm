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

  oneFocus() {

  }

  constructor() { }
}
