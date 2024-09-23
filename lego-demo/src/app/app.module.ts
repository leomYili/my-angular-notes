import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SlotComponent } from './wrap/slot.component';
import CardComponent from './components/card';
import { InputComponent } from './components/input/input.component';
import { component } from './components/card/card.component';
import { RootComponent } from './components/card/root/root.component';
import { TextComponent } from './components/card/text/text.component';
import { Root1Component } from './components/demo/root1/root1.component';
import { Text1Component } from './components/demo/text1/text1.component';

// 这里只要是封装的组件,必然是注册.component
@NgModule({
  declarations: [
    AppComponent,
    CardComponent.component,
    RootComponent,
    TextComponent,
    Root1Component,
    Text1Component,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
