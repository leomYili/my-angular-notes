import {
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnInit,
  Component,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-enterprise';

const maxColNum = 50;
const maxRowNum = 200;

@Component({
  selector: 'app-ag-grid-demo2',
  templateUrl: './ag-grid-demo2.component.html',
  styleUrls: ['./ag-grid-demo2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgGridDemo2Component
  implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked {
  @ViewChild('myGrid') grid!: AgGridAngular;

  // 主从表显示,同一行展开收起
  masterDetail = false;

  // 是否打开区域选择
  enableRangeSelection = true;

  // 是否打开区域选择把手
  enableRangeHandle = true;

  // 设置单元格为只读
  readOnlyEdit = false;

  // 阻止表格列虚拟化
  suppressColumnVirtualisation = true;

  // 阻止表格行虚拟化
  suppressRowVirtualisation = true;

  columnDefs: ColDef[] = [
    {
      field: 'make',
      cellRenderer: params => {
        return '<span>ssdsdsdsd</span>';
      }
    },
    { field: 'model' },
    { field: 'price' },
    { headerName: '特殊列', field: 'empty', pinned: 'right' }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  ngOnInit(): void {
    console.log('初始化', this.grid);
    let columns = [];
    let dataStore = [];

    for (let i = 0; i < maxColNum; i++) {
      columns.push({ field: `grid${i}`, headerName: `GRID-${i}` });
    }

    this.columnDefs = columns;

    for (let i = 0; i < maxRowNum; i++) {
      let obj: any = {};
      for (let j = 0; j < maxColNum; j++) {
        obj[`grid${j}`] = i;
      }
      dataStore.push(obj);
    }

    this.rowData = dataStore;
  }

  ngAfterContentChecked(): void {}

  ngAfterViewInit(): void {
    console.log('视图更新,只会触发一次');
    // console.log('viewInit', this.grid.api.sizeColumnsToFit());
  }

  ngAfterViewChecked(): void {
    // console.log('视图更新,多次触发');
  }
}
