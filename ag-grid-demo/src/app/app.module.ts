import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridDemo1Component } from './ag-grid-demo1/ag-grid-demo1.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';

import { CellInputComponent } from './table-component/cell-input/cell-input.component';
import { AgGridDemo2Component } from './ag-grid-demo2/ag-grid-demo2.component';
import { SimpleDemo3Component } from './simple-demo3/simple-demo3.component';
import { SimpleItemComponent } from './simple-item/simple-item.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AgGridDemo1Component,
    CellInputComponent,
    AgGridDemo2Component,
    SimpleDemo3Component,
    SimpleItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzDividerModule,
    NzMenuModule,
    NzInputModule,
    AgGridModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
