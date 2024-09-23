import {
  Component,
  ComponentRef,
  ViewContainerRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';

import type { DeclarativeComponent } from '../interfaces';
import { LifeCycleComponentFunctionNames } from '../constants';
import { pick, inject, mapValues } from '../utils';

function normalizeListener(listener: any) {
  if (listener === undefined) return;
  return Array.isArray(listener) ? listener : [listener];
}

function normalizeListenerResult(result: any) {
  return Array.isArray(result) ? result : [result];
}

/**
 * 这里用函数动态创建只是为了更好的贴合纯函数的定义
 * 在angular12中不支持这种动态写法,但使用service进行注入的方式实际最终效果是一致的
 * @param declarativeComponent 
 * @returns 
 */
export function wrap(declarativeComponent: DeclarativeComponent) {
  const {
    displayName,
    selector,
    template,
    defaultStateTypes = {},
    getDefaultState = () => ({}),
    defaultListeners = {},
    defaultIntercepters = {},
    defaultWrappers = {},
    initialize = () => ({}),
    component,
  } = declarativeComponent;

  if (!selector) {
    throw new Error('动态组件必须要有自定义的选择器！！！');
  }

  /**
   * 该组件是工厂函数,用于组装生成各个组件
   */
  @Component({
    selector: selector,
    template: `<ng-container #container></ng-container>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class WrapComponent implements OnInit {
    private instance: any;
    private listeners: any;
    private intercepters: any;

    private componentRef!: ComponentRef<any>;

    // 对外暴露的唯一通信方式,单向,保证数据流向是正确的
    @Input() public props!: { [name: string]: any };
    private _state: any = getDefaultState();

    // 内部状态,这里props只是第一次的状态,每次更新了之后需要同步给state,
    // state操作需要调用特殊方法,其实内部是做了一层通信方法
    private get state() {
      return this._state;
    }

    setState(state: any) {
      this._state = state;
      this.componentRef.instance.state = this._state;
    }

    @ViewChild('container', { read: ViewContainerRef, static: true })
    containerRef!: ViewContainerRef;

    [index: string]: any;

    constructor(
      private viewContainerRef: ViewContainerRef,
      private changeDetectorRef: ChangeDetectorRef
    ) {
      this.instance = initialize();

      this.setupLifeCycles();
      this.setupListeners();
      this.setupIntercepters();
    }

    ngOnInit(): void {
      const stateValueNames = Object.keys(defaultStateTypes);

      this._state = {
        ...getDefaultState(),
        ...pick(this.props, (_: any, name: string) =>
          stateValueNames.includes(name)
        ),
      };

      this.render();
    }

    pickListenerArg = () => {
      return pick(this, ['state', 'instance']);
    };

    pickRenderArg = () => {
      return pick(this, ['state', 'instance', 'listeners', 'intercepters']);
    };

    setupLifeCycles() {
      LifeCycleComponentFunctionNames.forEach((name) => {
        if (declarativeComponent[name] !== undefined) {
          (this[name] as any) = inject(
            declarativeComponent[name],
            this.pickRenderArg
          );
        }
      });
    }

    setupListeners() {
      this.listeners = mapValues(
        defaultListeners,
        (defaultListener: any, name: string) => {
          return (...runtimeArgs: any) => {
            const listenerArg = this.pickListenerArg();
            const normalizedResult = normalizeListener(this.props?.[name]);

            if (normalizedResult === undefined)
              return this.handleListenerResult(
                defaultListener(listenerArg, ...runtimeArgs)
              );

            const [listener, preventDefault = false, before = false] =
              normalizedResult;
            if (preventDefault === true)
              return listener !== undefined
                ? this.handleListenerResult(
                    listener(listenerArg, ...runtimeArgs)
                  )
                : undefined;

            if (before === false) {
              const nextState = defaultListener(listenerArg, ...runtimeArgs);
              const nextArg = {
                ...listenerArg,
                state: {
                  ...listenerArg.state,
                  ...nextState,
                },
              };

              const listenerResult = listener(nextArg, ...runtimeArgs);

              return this.handleListenerResult(
                listenerResult === undefined ? nextState : listenerResult
              );
            }

            const listenerResult = normalizeListenerResult(
              listener(listenerArg, ...runtimeArgs)
            );
            if (listenerResult === undefined) return;

            const [nextState = {}, preventDefaultOnFly = false] =
              listenerResult;
            if (preventDefaultOnFly)
              return this.handleListenerResult(nextState);

            const nextArg = {
              ...listenerArg,
              state: {
                ...listenerArg.state,
                ...nextState,
              },
            };

            const defaultListenerResult = defaultListener(
              nextArg,
              ...runtimeArgs
            );
            return this.handleListenerResult(
              defaultListenerResult === undefined
                ? nextState
                : defaultListenerResult
            );
          };
        }
      );
    }

    setupIntercepters() {
      this.intercepters = mapValues(
        defaultIntercepters,
        (defaultIntercepter: any, name: string) =>
          inject(
            this.props?.[name] === undefined
              ? defaultIntercepter
              : this.props?.[name],
            this.pickListenerArg
          )
      );
    }

    /**
     * 这里是执行结果,可以看做是每次自定义事件的after
     * 如果有返回值的话,会进行设置,并更新
     * @param result
     */
    handleListenerResult(result: any) {
      if (typeof result === 'object') {
        this.setState(result);
        this.changeDetectorRef.markForCheck();
      }
    }

    // 动态渲染组件逻辑
    render() {
      const wrappers = mapValues(
        defaultWrappers,
        (wrapper: any, name: string) =>
          this.props[name] === undefined ? wrapper : this.props[name]
      );
      this.containerRef?.clear();
      this.componentRef = this.containerRef?.createComponent(component);

      console.log(this.pickRenderArg(), wrappers);
      this.componentRef.instance.props = {
        wrappers,
      };
      this.componentRef.instance.state = this.state;

      // 待补充
      this.componentRef.instance.setState.subscribe((value: any) =>
        console.log(value)
      );
    }
  }

  return { displayName, component: WrapComponent };
}
