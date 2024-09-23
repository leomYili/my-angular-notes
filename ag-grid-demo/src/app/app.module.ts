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

import {} from '@ngrx/component-store';
import {} from '@ngrx/store-devtools';
import {} from '@ngrx/component';

import {} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {} from '@ngrx/router-store';

import { ScrollingModule } from './components/scrolling';
import { CustomStatsToolPanel } from './components/custom-stats-tool-panel/custom-stats-tool-panel';

import { CellInputComponent } from './table-component/cell-input/cell-input.component';
import { AgGridDemo2Component } from './ag-grid-demo2/ag-grid-demo2.component';
import { SimpleDemo3Component } from './simple-demo3/simple-demo3.component';
import { SimpleItemComponent } from './simple-item/simple-item.component';
import { SimpleDemo4Component } from './simple-demo4/demo4.component';
import { VirtualScrollingDirective } from './simple-demo4/virtual-scrolling.directive';
import { VirtualForOf } from './simple-demo4/virtual-for-of.directive';
import { SimpleDemo5Component } from './simple-demo5/demo5.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AgGridDemo1Component,
    CellInputComponent,
    AgGridDemo2Component,
    SimpleDemo3Component,
    SimpleDemo4Component,
    SimpleItemComponent,
    VirtualScrollingDirective,
    VirtualForOf,
    CustomStatsToolPanel,
    SimpleDemo5Component
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
    AgGridModule.withComponents([CustomStatsToolPanel]),
    ScrollingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
