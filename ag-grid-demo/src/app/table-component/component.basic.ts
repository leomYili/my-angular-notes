import { EventEmitter, Directive } from '@angular/core';

import { ICellRendererParams, ColDef } from 'ag-grid-community';

interface AthBaseCellParams {
  colId: string;
  value: any;
  data: any;
  colDef: ColDef;
  params: ICellRendererParams;
}

export interface AthComponent {
  data: any;
  isRender: boolean;
  compProps: any;
  /**
   * 初始化勾子函数
   *
   * @param params { ICellRendererParams }
   */
  athOnInit: (params: ICellRendererParams) => void;

  dispatchFocus?(): void;

  change: EventEmitter<any>;
  focus: EventEmitter<any>;
  blur: EventEmitter<any>;
}

@Directive()
export abstract class AthBasicComponent implements AthComponent {
  data!: AthBaseCellParams;
  cellRendererParams!: ICellRendererParams;
  compProps: any;

  isRender!: boolean;

  blur!: EventEmitter<any>;
  change!: EventEmitter<any>;
  focus!: EventEmitter<any>;

  constructor() {}

  /**
   * 初始化勾子函数
   * cell-render中实例创建后，属性已传入后执行
   *
   * @param params
   */
  athOnInit(params: ICellRendererParams): void {
    this.cellRendererParams = params;
  }

  onBlur($event: any): void {
    if ($event instanceof Event) {
      $event.stopPropagation();
    }

    this.blur.emit($event);
  }

  onChange($event: any): void {
    if ($event instanceof Event) {
      $event.stopPropagation();
    }

    this.change.emit($event);
  }

  onFocus($event: any): void {
    if ($event instanceof Event) {
      $event.stopPropagation();
    }

    this.focus.emit($event);
  }
}
