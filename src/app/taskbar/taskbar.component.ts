import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, QueryList, } from '@angular/core';
import { WindowService } from '../window.service';
import { Window } from '../window/window';
import { map, subscribeOn } from 'rxjs/operators';
import { from, Observable, Observer, Subscriber } from 'rxjs';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  // windows: QueryList<WindowComponent>;
  windowList: any //Window[] = [];

  constructor(public windowService: WindowService) { }

  ngOnInit() {
    this.windowService.windows$.subscribe((response: any) => {
      this.windowList = response;
      console.log(this.windowList)
    });
  }

    // setTimeout(() => {
    //   this.windows = this.windowService.windows;

    //   this.windowList = [];
    //   this.windows.forEach(x => {
    //     this.windowList.push({'title': x.title,
    //                           'icon': `assets/icons/${x.title}-icon.png`});
    //   });
    // });
    // this.windowList = this.windowService.getWindows();
    // console.log(this.windowList)
}
