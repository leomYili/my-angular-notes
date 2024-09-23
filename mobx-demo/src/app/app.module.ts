import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MobxAngularModule } from 'mobx-angular';
import { configure } from 'mobx';

import { AppComponent } from './app.component';
import { ObservableDemoComponent } from './observable-demo/observable-demo.component';
import { MakeAutoObservableDemoComponent } from './make-auto-observable-demo/make-auto-observable-demo.component';

configure({
  enforceActions: 'always',
  disableErrorBoundaries: true,
});

@NgModule({
  declarations: [AppComponent, ObservableDemoComponent, MakeAutoObservableDemoComponent],
  imports: [BrowserModule, MobxAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
