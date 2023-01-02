import { ElementRef, Injectable, QueryList } from '@angular/core';
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

  focusElements: focusElement[] = [];

  getFocus(window: WindowComponent) {
    window.focus = true;

    for (let x of this.windows) {
      if (window._title !== x._title) x.focus = false;
    }

    setTimeout(() => {
      if (window.focusElement) window.focusElement.nativeElement.focus();
    });
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

  pushFocusElement(window: WindowComponent, element: ElementRef) {
    this.focusElements.push({
      window: window._title,
      element: element
    });
  }

  getFocusElement(window: WindowComponent) {
    for (let x of this.focusElements) {
      if (window._title == x.window) window.focusElement = x.element;
    }
  }

  constructor() { }
}

interface focusElement {
  window: string;
  element: ElementRef;
}
