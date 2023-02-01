import { Component, Input } from '@angular/core';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() title: string = '';
  @Input() content: string = '#+TITLE: imre.al\n#+AUTHOR: Lee Luppi\n#+EMAIL: lee@imre.al';

  lineCount(): number[] {
    let lineCount = this.content.match(/\n/g);
    if (!lineCount) return [1];

    let lines: number[] = [];
    for (let i = 1; i < lineCount.length + 2; i++) lines.push(i);
    return lines;
  }

  wordCount(): number {
    let wordCount = this.content.match(/\n| /g);
    return wordCount ? wordCount.length : 1;
  }
}
