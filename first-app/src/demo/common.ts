import { FormControlStatus } from '@angular/forms';
import {
  ComponentHooks,
  ProxyComponentInstance,
} from '../types/component-hooks';
import { DataHooks, HookOptions, IDataControl } from 'src/types/data-control-hooks';

export class CommonComponent<TValue, TFields>
  implements ComponentHooks<TValue, TFields>
{
  afterConstructor(
    proxyInstance: ProxyComponentInstance<TValue, TFields>,
    control: IDataControl<TValue, TFields>,
    options: HookOptions
  ): void {
    throw new Error('Method not implemented.');
  }
  afterInit(
    proxyInstance: ProxyComponentInstance<TValue, TFields>,
    control: IDataControl<TValue, TFields>,
    currentData: TFields,
    options: HookOptions
  ): void {
    throw new Error('Method not implemented.');
  }
  valueChanges(
    proxyInstance: ProxyComponentInstance<TValue, TFields>,
    control: IDataControl<TValue, TFields>,
    currentData: TFields,
    options: HookOptions
  ): void {
    throw new Error('Method not implemented.');
  }
  statusChanges(
    proxyInstance: ProxyComponentInstance<TValue, TFields>,
    control: IDataControl<TValue, TFields>,
    status: FormControlStatus,
    options: HookOptions
  ): void {
    throw new Error('Method not implemented.');
  }
  beforeDestroy(
    proxyInstance: ProxyComponentInstance<TValue, TFields>,
    control: IDataControl<TValue, TFields>,
    currentData: TFields,
    options: HookOptions
  ): void {
    throw new Error('Method not implemented.');
  }
}

export class CommonData<TValue, TFields> implements DataHooks<TValue, TFields> {
  valueChanges(component: ProxyComponentInstance<TValue, TFields>, control: IDataControl<TValue, TFields>, currentData: TFields, options: HookOptions): void {
    throw new Error('Method not implemented.');
  }
  afterReset(component: ProxyComponentInstance<TValue, TFields>, control: IDataControl<TValue, TFields>, currentData: TFields, options: HookOptions): void {
    throw new Error('Method not implemented.');
  }
  afterAdd(component: ProxyComponentInstance<TValue, TFields>, control: IDataControl<TValue, TFields>, currentData: TFields, options: HookOptions): void {
    throw new Error('Method not implemented.');
  }
  afterRemove(component: ProxyComponentInstance<TValue, TFields>, control: IDataControl<TValue, TFields>, currentData: TFields, options: HookOptions): void {
    throw new Error('Method not implemented.');
  }
  afterSet(component: ProxyComponentInstance<TValue, TFields>, control: IDataControl<TValue, TFields>, currentData: TFields, options: HookOptions): void {
    throw new Error('Method not implemented.');
  }
  afterClear(component: ProxyComponentInstance<TValue, TFields>, control: IDataControl<TValue, TFields>, currentData: TFields, options: HookOptions): void {
    throw new Error('Method not implemented.');
  }
}
