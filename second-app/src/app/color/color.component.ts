import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DColorDirective } from '../d-color.directive';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [CommonModule, DColorDirective],
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent {}
