import { Injectable, QueryList } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { last, Observable, Subject } from 'rxjs';

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
    this.windows$.subscribe((response: any) => {
      console.log(response);
      if (response.first.focus) response.last.focus = false;
    });
  }

  constructor() { }
}
