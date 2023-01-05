import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShutdownComponent } from './shutdown/shutdown.component';

const routes: Routes = [
  { path: 'shutdown', component: ShutdownComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
