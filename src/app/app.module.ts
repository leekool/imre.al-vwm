import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { PostComponent } from './post/post.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { WindowService } from './window.service';
import { DesktopComponent } from './desktop/desktop.component';
import { TerminalComponent } from './terminal/terminal.component';
import { ShutdownComponent } from './shutdown/shutdown.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    PostComponent,
    TaskbarComponent,
    DesktopComponent,
    TerminalComponent,
    ShutdownComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
