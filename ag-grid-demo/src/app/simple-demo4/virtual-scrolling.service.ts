import { Injectable } from '@angular/core';

interface flattenData {
  record: any;
  index: number;
  height: number;
  top: number;
  bottom: number;
}

/**
 * 该服务是个单例服务,用于统一提供数据处理相关与
 */
@Injectable()
export class VirtualScrollingService {
  dataSource: flattenData[] = [];

  renderList: any[];

  /**
   * 针对数据进行初始化处理,需要转为虚拟化列表结构
   */
  initDataSource(data: any[]) {
    this.computedRenderList(0, 5);
  }

  computedRenderList(startIndex: number, endIndex: number) {
    this.renderList = this.dataSource.slice(startIndex, endIndex + 1);
  }
}
