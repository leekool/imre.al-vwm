import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shutdown',
  templateUrl: './shutdown.component.html',
  styleUrls: ['./shutdown.component.css']
})

export class ShutdownComponent implements OnInit {
  commandList = new CommandList;
  commands = [
    'test',
    ['test', true],
    'test2',
  ]

  constructor() {
    this.commandList.newCommand(this.commands);
  }

  ngOnInit(): void {
    console.log(this.commandList.getCommands());
  }
}

class Command {
  text: string;
  ok: boolean;

  constructor(text: string, ok: boolean = false ) {
    this.text = text;
    this.ok = ok;
  }
}

class CommandList {
  commands: Command[] = [];

  newCommand(array: any[]): void {
    for (let x of array) {
      let command: Command;

      if (Array.isArray(x)) command = new Command(x[0], x[1]);
      else command = new Command(x);

      this.commands.push(command);
    }
  }

  getCommands() {
    return this.commands;
  }
}
