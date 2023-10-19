import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  bootstrapApplication,
  enableDebugTools,
} from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/header/header.component';
import { NgForComponent } from './app/ng-for/ng-for.component';
import { FormsComponent } from './app/forms/forms.component';
import { ColorComponent } from './app/color/color.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'header',
    pathMatch: 'full',
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'ng-for',
    component: NgForComponent,
  },
  {
    path: 'ng-forms',
    component: FormsComponent,
  },
  {
    path: 'color',
    component: ColorComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
