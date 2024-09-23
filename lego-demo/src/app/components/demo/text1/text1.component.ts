import {
  Component,
  Input,
  TemplateRef,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-text1',
  templateUrl: './text1.component.html',
  styleUrls: ['./text1.component.css'],
})
export class Text1Component implements AfterViewInit {
  @Input() tpl!: TemplateRef<any>;

  @ViewChild('content', { read: ElementRef })
  content!: ElementRef; // 获取元素的引用

  constructor(private element: ElementRef, private render: Renderer2) {}

  ngAfterViewInit(): void {
    this.replaceText();
  }

  replaceText() {
    // 获取元素的内容
    const text = this.content.nativeElement.textContent;
    let newText = '';
    // 使用正则表达式来匹配和替换部分文字
    if (/^name:/.test(text) ) newText = text.replace(/^name:/g, '姓名:');
    if (/^age:/.test(text))  newText = text.replace(/^age:/g, '年龄:');
    // 修改元素的内容
    this.render.setProperty(this.content.nativeElement, 'textContent', newText);
  }
}
