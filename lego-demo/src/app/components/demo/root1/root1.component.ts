import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'root1',
  templateUrl: './root1.component.html',
  styleUrls: ['./root1.component.css'],
})
export class Root1Component {
  @Input() tpl!: TemplateRef<any>;
}
