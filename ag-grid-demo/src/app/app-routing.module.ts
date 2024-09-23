import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridDemo1Component } from './ag-grid-demo1/ag-grid-demo1.component';
import { AgGridDemo2Component } from './ag-grid-demo2/ag-grid-demo2.component';
import { SimpleDemo3Component } from './simple-demo3/simple-demo3.component';
import { SimpleDemo4Component } from './simple-demo4/demo4.component';
import { SimpleDemo5Component } from './simple-demo5/demo5.component';
import { SimpleDemo6Component } from './simple-demo6/demo6.component';

const routes: Routes = [
  { path: '', redirectTo: '/demo1', pathMatch: 'full' },
  { path: 'demo1', component: AgGridDemo1Component },
  { path: 'demo2', component: AgGridDemo2Component },
  { path: 'demo3', component: SimpleDemo3Component },
  { path: 'demo4', component: SimpleDemo4Component },
  { path: 'demo5', component: SimpleDemo5Component },
  { path: 'demo6', component: SimpleDemo6Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
