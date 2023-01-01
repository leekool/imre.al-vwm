import { Component, OnInit, ViewChild } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  @ViewChild('command') commandLineInput: any;

  constructor(private windowService: WindowService) { }

  onEnter(command: HTMLInputElement) {
    console.log(command);
    command.value = '';
  }

  ngOnInit(): void {
  }

}
