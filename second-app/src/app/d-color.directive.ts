import { Directive, Input, OnInit, Renderer2,ElementRef } from '@angular/core';

@Directive({
  selector: '[appDColor]',
  standalone: true,
})
export class DColorDirective implements OnInit {
  @Input() color!: string;

  constructor(private elementRef: ElementRef,private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.color);
  }
}
