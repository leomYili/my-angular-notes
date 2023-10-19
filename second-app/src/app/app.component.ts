import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NgForComponent } from './ng-for/ng-for.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, NgForComponent],
})
export class AppComponent {
  title = 'second-app';

  theme = 'dark-theme';

  isNeedHeader = true;

  constructor() {
    console.log('AppComponent constructor');
  }

  switchIsNeedHeader() {
    this.isNeedHeader = !this.isNeedHeader;
  }
}
