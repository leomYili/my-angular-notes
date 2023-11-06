import {
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnInit,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-enterprise';


@Component({
  selector: 'app-ag-grid-demo1',
  templateUrl: './ag-grid-demo1.component.html',
  styleUrls: ['./ag-grid-demo1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridDemo1Component
  implements
    OnInit,
    AfterContentInit,
    AfterViewInit,
    AfterContentChecked,
    AfterViewChecked
{
  @ViewChild('myGrid') grid!: AgGridAngular;

  // 主从表显示,同一行展开收起
  masterDetail = false;

  // 是否打开区域选择
  enableRangeSelection = true;

  // 是否打开区域选择把手
  enableRangeHandle = true;

  // 设置单元格为只读
  readOnlyEdit = false;

  columnDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ];

  ngOnInit(): void {
    console.log('初始化', this.grid);
  }

  ngAfterContentInit(): void {
    console.log('投射内容更新,只会触发一次');
    console.log('contentInit', this.grid);
  }

  ngAfterContentChecked(): void {}

  ngAfterViewInit(): void {
    console.log('视图更新,只会触发一次');
    console.log('viewInit', this.grid);
  }

  ngAfterViewChecked(): void {
    console.log('视图更新,多次触发');
  }
}
