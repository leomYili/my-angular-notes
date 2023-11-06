import {
  FormControlState,
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { UPath } from './constants';

import { IProxyControl } from './proxy-control';
import { IProxyGroup } from './data-proxy-group';

export interface IProxyArray<TValue, TControl, TFields> {
  parent:
    | IProxyGroup<TValue, TControl, TFields>
    | IProxyArray<TValue, TControl, TFields>
    | null;
  /**
   * 当前绑定字段的值的集合,这里需要注意,不仅仅是value,需要用数据对象的结构+当前组件的value,才是field
   * 如果当前组件是一个group,则需要返回这个group下的所有字段的值(当前页面中存在的组件的对应的值)
   */
  readonly field: TFields;
  length: number;
  controls: {
    [key: string]:
      | IProxyArray<TValue, TControl, TFields>
      | IProxyGroup<TValue, TControl, TFields>
      | IProxyControl<TValue, TFields>;
  };

  value: TValue;
  valueIsChanged: boolean;
  status: string; // 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
  dirty: boolean;
  disabled: boolean;
  valid: boolean;
  invalid: boolean;
  pending: boolean;
  enabled: boolean;
  disableState: boolean;

  at(index: number): TControl;
  push(control: TControl, options: { emitEvent?: boolean }): void;
  insert(
    index: number,
    control: TControl,
    options: { emitEvent?: boolean }
  ): void;
  removeAt(index: number, options: { emitEvent?: boolean }): void;
  setValue(
    value: TValue,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ): void;
  patchValue(
    value: TValue,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ): void;
  reset(
    formState?: TValue | FormControlState<TValue>,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;

  addControl(
    name: string,
    control: TControl,
    options: { emitEvent?: boolean }
  ): void;
  setControl(
    name: string,
    control: IProxyControl<TValue, TFields>,
    options: { emitEvent?: boolean }
  ): void;
  removeControl(name: UPath, options: { emitEvent?: boolean }): void;
  addValidators(validators: ValidatorFn | ValidatorFn[]): void;
  addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void;
  removeValidators(validators: ValidatorFn | ValidatorFn[]): void;
  removeAsyncValidators(
    validators: AsyncValidatorFn | AsyncValidatorFn[]
  ): void;

  setName(name: string): void;
  getName(): string;
  /**
   * 获取字段所在路径
   */
  getPath(): UPath;
  /**
   * 获取字段所在路径
   */
  getFullPath(): UPath;
  setDisableState(disabled: boolean): void;
}
