import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent {
  @Input() tpl!: TemplateRef<any>;
}
