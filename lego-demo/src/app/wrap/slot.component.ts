import {
  Component,
  ComponentFactory,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'c-slot',
  imports: [CommonModule],
  template:
    '<ng-container #container><ng-template #content><ng-content></ng-content></ng-template></ng-container>',
})
export class SlotComponent implements OnInit {
  private componentRef!: ComponentRef<any>;

  // 组件集合,
  @Input() wrappers!: { [key: string]: ComponentFactory<any> };
  @Input() name!: string;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  containerRef!: ViewContainerRef;

  @ViewChild('content', { read: TemplateRef, static: true })
  contentRef!: TemplateRef<any>;

  ngOnInit(): void {
    console.log(this.name, this.wrappers);
    this.render();
  }

  render() {
    this.containerRef?.clear();
    this.componentRef = this.containerRef?.createComponent(
      this.wrappers[this.name]
    );

    this.componentRef.instance.tpl = this.contentRef;
  }
}
