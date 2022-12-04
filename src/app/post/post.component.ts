import { Component, Input } from '@angular/core';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() content: string = 'i am\ncool\ncool test\ncool\ntest';

  lineCount(): number[] {
    let lineCount = this.content.match(/\n/g);
    let lines: number[] = [];
    for (let i = 1; i - 2 < lineCount!.length; i++) lines.push(i);
    return lines;
  }

  wordCount() {
    let wordCount = this.content.match(/\n| /g);
    return wordCount!.length;
  }

}

// var content = document.querySelectorAll('.content p');
// var contentText = 'test test\ntest test test\ntest\ntest\ntest test\ncool\ntest\n\ncool test\ncool\nwow';
// content[0].textContent = contentText;
// // line count
// function footerLineWordCount() {
//     var lineCount = contentText.match(/\n/g);
//     var lines = document.querySelector('.lines p');
//     for (var i = 1; i - 2 < lineCount.length; i++) {
//         lines.textContent += "".concat(i, "\n");
//     }
//     var wordCount = contentText.match(/\n| /g);
//     document.querySelector('.word-count').textContent = "".concat(lineCount.length + 1, ":").concat(wordCount.length);
// }
// // word count
// function footerWordCount() {
// }
// // html file name
// function footerFileName() {
//     var fileName = document.querySelector('.file-name');
//     var url = location.href.substring(location.href.lastIndexOf('/') + 1);
//     fileName.textContent = (url === '') ? 'index.html' : url;
// }
// // html file size
// function footerFileSize() {
//     var size;
//     try {
//         var x = new XMLHttpRequest;
//         x.open("HEAD", document.URL, false);
//         x.send(null);
//         if (x.status == 200) {
//             size = parseInt(x.getResponseHeader('Content-Length'));
//         }
//         else {
//             return;
//         }
//     }
//     catch (er) {
//         return;
//     }
//     var i = Math.floor(Math.log(size) / Math.log(1024));
//     var fileSize = document.querySelector('.file-size');
//     fileSize.textContent = "".concat(parseFloat((size / Math.pow(1024, i)).toFixed(1)), "k");
// }
// footerLineWordCount();
// footerFileName();
// footerFileSize();
