import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgGridDemo1Component } from './ag-grid-demo1/ag-grid-demo1.component';
import { AgGridDemo2Component } from './ag-grid-demo2/ag-grid-demo2.component';
import { SimpleDemo3Component } from './simple-demo3/simple-demo3.component';

const routes: Routes = [
  { path: '', redirectTo: '/demo1', pathMatch: 'full' },
  { path: 'demo1', component: AgGridDemo1Component },
  { path: 'demo2', component: AgGridDemo2Component },
  { path: 'demo3', component: SimpleDemo3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
