interface Demo1State {
  rowData: any[];
  enableRangeSelection: boolean; // 是否打开区域选择
  enableRangeHandle: boolean; // 是否打开区域选择把手
  readOnlyEdit: boolean; // 设置单元格为只读
}

const initialDemo1State: Demo1State = {
  rowData: [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ],
  enableRangeSelection: true,
  enableRangeHandle: true,
  readOnlyEdit: false
};
