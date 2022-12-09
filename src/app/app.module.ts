import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { PostComponent } from './post/post.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { WindowService } from './window.service';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    PostComponent,
    TaskbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
