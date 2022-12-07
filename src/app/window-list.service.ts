import { ElementRef, Injectable, ViewChildren } from '@angular/core';
import { WindowComponent } from './window/window.component';

@Injectable({
  providedIn: 'root'
})
export class WindowListService {

  // @ViewChildren(WindowComponent, {read: ElementRef})

  constructor() { }
}
