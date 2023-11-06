import { ProxyComponentInstance } from './component-hooks';
import { IProxyControl } from './proxy-control';
import { IProxyArray } from './data-proxy-array';
import { IProxyGroup } from './data-proxy-group';
import { Context } from './context';
import { Utils } from './utils';
import { DataStore } from './data-store';

export interface HookOptions {
  readonly context: Context;
  DataStore: DataStore<any, any>;
  utils: Utils;
}

export interface IDataControl<PValue, PFields> {
  readonly parent:
    | IProxyArray<PValue, any, PFields>
    | IProxyGroup<PValue, any, PFields>;

  control: IProxyControl<PValue, PFields>;
  value: any;
  getComponentByPath: (
    path: string
  ) => ProxyComponentInstance<PValue, PFields> | null; // ProxyComponentInstance待补充。通过get获取，然后control._component
  getComponentByPathAll: (
    path: string
  ) => ProxyComponentInstance<PValue, PFields>[]; // ProxyComponentInstance待补充，一个form的子项path是唯一的，还是说场景是path不一致，schema一致，那取名是否用ByName或者ById
  // 更新：control唯一，挂载实例获取到component数组，DynamicFormControlContainerComponent组件的createFormControlComponent方法，添加component.control['_components']属性，获取control._components
  getComponentByType: (
    type: string
  ) => ProxyComponentInstance<PValue, PFields> | null; // ProxyComponentInstance待补充，当前formItem没有视图信息，只能从_component.model捞，是不是层级太深了
  // 更新：统一的服务，不从form内部获取
  getComponentByTypeAll: (
    type: string
  ) => ProxyComponentInstance<PValue, PFields>[]; // ProxyComponentInstance待补充
  getControlByPath: (path: string) => IProxyControl<PValue, PFields> | null; // 从root上get
}

export interface DataHooks<PValue, PFields> {
  valueChanges(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    currentData: PFields,
    options: HookOptions
  ): void;
  afterReset(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    currentData: PFields,
    options: HookOptions
  ): void;
  afterAdd(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    currentData: PFields,
    options: HookOptions
  ): void;
  afterRemove(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    currentData: PFields,
    options: HookOptions
  ): void;
  afterSet(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    currentData: PFields,
    options: HookOptions
  ): void;
  afterClear(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    currentData: PFields,
    options: HookOptions
  ): void;
}
