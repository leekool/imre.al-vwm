import { Injectable, QueryList } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { Window } from './window/window';
import { from, Observable, startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  windows: QueryList<WindowComponent>;

  updateWindows$ = Observable.create((observer: any) => {
    observer.next(this.windows);
  });

  windows$ = new Subject();



  constructor() { }
}
