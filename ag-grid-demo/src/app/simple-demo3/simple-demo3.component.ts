import {
  Component,
  OnInit,
  ViewContainerRef,
  ChangeDetectorRef,
  CompilerFactory,
  ComponentFactoryResolver,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { SimpleItemComponent } from '../simple-item/simple-item.component';
import { timeSlice } from '../../utils/time-slice';

@Component({
  selector: 'app-simple-demo3',
  templateUrl: './simple-demo3.component.html',
  styleUrls: ['./simple-demo3.component.css']
})
export class SimpleDemo3Component implements OnInit {
  // 用于测试输入的交互是否正常
  value1 = '';
  value2 = '';

  // 用于返回执行的时间
  time1 = 0;
  time2 = 0;

  result1 = 0;
  result2 = 0;

  list1: FormGroup;
  list2: FormGroup;

  @ViewChild('agHost1', { read: ViewContainerRef }) agHost1: ViewContainerRef;
  @ViewChild('agHost2', { read: ViewContainerRef }) agHost2: ViewContainerRef;

  constructor(
    private cd: ChangeDetectorRef,
    private cf: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  // 执行大数据量计算工作,不使用任务切片
  onClickToBigDataNoTask() {
    const total = 300000;
    const start = performance.now();

    let sum = 0;
    for (let i = 1; i <= total; i++) {
      console.log('未切片', i);
      sum += i;
    }

    const end = performance.now();

    this.result1 = sum;
    this.time1 = end - start;
  }

  // 执行大数据量计算工作,使用任务切片
  onClickToBigDataUseTask() {
    let _this = this;
    let total = 300000;

    let sum = 0;
    const start = performance.now();

    function doSomething(i: number) {
      console.log('已切片', i);
      sum += i;
    }

    function* gen(this: any) {
      let i = 1;

      for (let i = 1; i <= total; i++) {
        yield doSomething(i);

        if (i === total) {
          const end = performance.now();
          _this.result2 = sum;
          _this.time2 = end - start;
          console.log(_this.time2);
          console.log('XXXX');

          // 微任务不会自动检测变更,这里需要手动更新一下
          _this.cd.detectChanges();
        }
      }
    }

    timeSlice(gen)();
  }

  createComponent(index: number, container: ViewContainerRef) {
    const group: any = {};

    // 获取动态组件的工厂对象
    const componentFactory = this.cf.resolveComponentFactory(
      SimpleItemComponent
    );
    group.name = new FormControl(index + ' test', [
      Validators.required,
      Validators.maxLength(12)
    ]);

    group.age = new FormControl(index, [
      Validators.required,
      Validators.maxLength(2)
    ]);

    const result = new FormGroup(group);

    // 创建动态组件的实例，并将其添加到容器元素中
    const componentRef = componentFactory.create(container.injector);

    componentRef.instance.index = index;
    componentRef.instance.question = {
      name: 'name',
      age: 'age'
    };
    componentRef.instance.form = result;

    container.insert(componentRef.hostView, index - 1);

    return result;
  }

  // 执行大数据量插入工作,不使用任务切片
  onClickToRenderNoTask() {
    this.agHost1.clear();

    const total = 5000;
    const start = performance.now();
    const list: any = {};

    for (let i = 1; i <= total; i++) {
      list[`${i}start`] = this.createComponent(i, this.agHost1);
    }

    this.list1 = new FormGroup(list);

    const end = performance.now();

    this.time1 = end - start;
  }

  // 执行大数据量插入工作,不使用任务切片
  onClickToRenderUseTask() {
    this.agHost2.clear();
    let _this = this;
    let total = 5000;
    const list: any = {};

    const start = performance.now();

    function doSomething(i: number) {
      list[`${i}start`] = _this.createComponent(i, _this.agHost2);
      // _this.cd.detectChanges();
    }

    function* gen(this: any) {
      let i = 1;

      for (let i = 1; i <= total; i++) {
        yield doSomething(i);

        if (i === total) {
          const end = performance.now();
          _this.time2 = end - start;

          _this.list2 = new FormGroup(list);

          // 微任务不会自动检测变更,这里需要手动更新一下
          _this.cd.detectChanges();
        }
      }
    }

    timeSlice(gen)();
  }
}
