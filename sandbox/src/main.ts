import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

import { Window1Component } from './window1/window1.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, Window1Component],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular
    </a>

    <div class="box1">
      <app-window1></app-window1>
    </div>
  `,
})
export class App {
  name = 'Angular';

  constructor() {
    // tslint: disable-line
    (window as any).globalStr = 'parent';

    window.addEventListener('scroll', () => {
      console.log('parent Event listener');
    });
  }
}

bootstrapApplication(App);
