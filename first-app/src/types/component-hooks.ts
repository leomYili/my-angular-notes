import { FormControlStatus } from '@angular/forms';
import { IProxyControl } from './proxy-control';
import { IDataControl } from './data-control-hooks';
import { UPath, UType } from './constants';
import { Context } from './context';
import { Utils } from './utils';

export interface HookOptions {
  readonly context: Context;
  DataStore: any;
  utils: Utils;
}

export interface ProxyComponentInstance<PValue, PFields> {
  readonly parent: ProxyComponentInstance<PValue, PFields>;
  setValue: () => PValue;

  getModel: () => any;
  getComponentByPath: (
    path: UPath
  ) => ProxyComponentInstance<PValue, PFields> | null;
  getComponentByPathAll: (
    path: UPath
  ) => ProxyComponentInstance<PValue, PFields>[] | null;
  getComponentByType: (
    type: UType
  ) => ProxyComponentInstance<PValue, PFields> | null;
  getComponentByTypeAll: (
    type: UType
  ) => ProxyComponentInstance<PValue, PFields> | null;
  getChildrenComponent: () => ProxyComponentInstance<PValue, PFields>[] | null;
  getControl: () => IProxyControl<PValue, PFields>;
  getControlByPath: () => IProxyControl<PValue, PFields>;
}

export interface ComponentHooks<PValue, PFields> {
  afterConstructor(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    options: HookOptions
  ): void;
  afterInit(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    currentData: PFields,
    options: HookOptions
  ): void;
  valueChanges(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    currentData: PFields,
    options: HookOptions
  ): void;
  statusChanges(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    status: FormControlStatus,
    options: HookOptions
  ): void;
  beforeDestroy(
    component: ProxyComponentInstance<PValue, PFields>,
    control: IDataControl<PValue, PFields>,
    currentData: PFields,
    options: HookOptions
  ): void;
}
