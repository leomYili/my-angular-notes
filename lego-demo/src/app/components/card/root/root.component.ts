import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent {
  @Input() tpl!: TemplateRef<any>;
}
