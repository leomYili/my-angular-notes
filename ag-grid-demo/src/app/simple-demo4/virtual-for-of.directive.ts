import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  AfterViewInit,
  Renderer2,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Observable, Subject, of as observableOf, isObservable } from 'rxjs';

interface flattenData {
  record: any;
  index: number;
  height: number;
  top: number;
  bottom: number;
}

@Directive({
  selector: '[virtualFor][virtualForOf]'
})
export class VirtualForOf implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  private viewMaxHeight = 300;
  private _data: flattenData[];

  startIndex = -1;
  endIndex = 0;
  lastStartIndex = -1;

  renderList: any[] = [];

  @Input('buffer') buffer = 5;

  /** Subject that emits when a new DataSource instance is given. */
  private readonly _dataSourceChanges = new Subject();

  ngOnInit(): void {}

  @Input() set virtualForOf(items: any[]) {
    console.log('items');

    this.initData(items);
  }

  ngAfterViewInit() {
    console.log(this.elementRef.nativeElement);
    // 在这里可以访问渲染后的 DOM 元素
    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    this.viewMaxHeight = rect.height;
  }

  initData(data: any[]) {
    let _data = [...data];
    for (let i = 0; i < _data.length; i++) {
      const _height = 50;
      let _top = _data[i - 1]?.bottom || 0;

      _data[i] = {
        record: _data[i],
        index: i,
        height: _height,
        top: _top,
        bottom: _top + _height
      };
    }
    this._data = _data;
    this.computedRenderList(0, 5);
  }

  @HostListener('scroll', ['$event.target']) onScroll(target: any) {
    let { startIndex, endIndex } = this.getVirtualIndex(target?.scrollTop);

    console.log(startIndex, endIndex);

    if (this.lastStartIndex === startIndex) return;

    this.lastStartIndex = startIndex;

    const currLen = this._data.length;

    // 接近滚动到列表底部
    if (endIndex > currLen - 1) {
      endIndex = currLen - 1;
    }

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'padding-top',
      `${this._data[startIndex]?.top || 0}px`
    );

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'padding-bottom',
      `${this._data[currLen - 1]?.bottom -
        this._data[endIndex]?.bottom}px`
    );

    this.computedRenderList(startIndex, endIndex);
  }

  getLastStartIndex(): number {
    return this.lastStartIndex;
  }

  computedRenderList(startIndex: number, endIndex: number) {
    this.renderList = this._data.slice(startIndex, endIndex + 1);

    this.render(this.renderList);
  }

  // 得到要渲染数据的起始索引和结束索引
  getVirtualIndex = (scrollTop: any) => {
    // 设置缓冲区域的数据量
    const aboveCount = this.buffer;
    const belowCount = this.buffer;

    // 结果数组，里面包含了起始索引和结束索引
    const resObj = {
      startIndex: 0,
      endIndex: 0
    };
    const len = this._data.length;
    // 设置上层缓冲区，如果索引值大于缓冲区域，那么就需要减小startIndex的值用于设置顶层缓冲区
    const startIndex = this.binarySearch(scrollTop);
    if (startIndex <= aboveCount) {
      resObj.startIndex = 0;
    } else {
      resObj.startIndex = startIndex - aboveCount;
    }
    /**
     * 缓冲数据中第一个bottom大于滚动高度加上可视区域高度的元素就是可视区域最后一个元素
     * 如果没有找到的话就说明当前滚动的幅度过大，缓存中没有数据的bottom大于我们的目标值，所以搜索不到对应的索引，我们只能拿缓存数据中的最后一个元素补充上
     */
    const endIndex =
      this.binarySearch(scrollTop + this.viewMaxHeight) || len - 1;
    // 增大endIndex的索引值用于为滚动区域下方设置一段缓冲区，避免快速滚动所导致的白屏问题
    resObj.endIndex = endIndex + belowCount;
    return resObj;
  };

  binarySearch(value: any): number {
    let start = 0;
    let end = this._data.length - 1;
    let tempIndex = -1;
    while (start <= end) {
      let midIndex = parseInt((start + end) / 2 + '');
      let midValue = this._data[midIndex].bottom;
      if (midValue === value) {
        return midIndex + 1;
      } else if (midValue < value) {
        start = midIndex + 1;
      } else if (midValue > value) {
        if (tempIndex === -1 || tempIndex > midIndex) {
          tempIndex = midIndex;
        }
        end--;
      }
    }
    return tempIndex;
  }

  render(list: any) {
    this.viewContainer.clear();

    // 遍历数组并创建元素
    list.forEach((item: any, index: number) => {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: item.record,
        index
      });
    });
  }
}
