import { AfterViewChecked, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { WindowComponent } from './window/window.component';
import { WindowService } from './window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked, OnInit {

  constructor(public windowService: WindowService) { }

  @ViewChildren(WindowComponent) windows: QueryList<WindowComponent>;

  ngOnInit(): void {
    // this.windowService.updateWindows$.subscribe(this.windowService.windows$);
  }

  ngAfterViewChecked(): void {
    this.windowService.windows = this.windows;
    this.windowService.updateWindows$.subscribe(this.windowService.windows$);
  }
}
