import { Component } from '@angular/core';

@Component({
  selector: 'terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent {

  onEnter(command: any) {
    console.log(command);
    command.value = '';
  }

}
