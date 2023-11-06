import {
  FormControlState,
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { UPath } from './constants';

import { IProxyControl } from './proxy-control';
import { IProxyArray } from './data-proxy-array';

export interface IProxyGroup<TValue, TControl, TFields> {
  parent:
    | IProxyArray<TValue, TControl, TFields>
    | IProxyGroup<TValue, TControl, TFields>
    | null;
  controls: {
    [key: string]:
      | IProxyArray<TValue, TControl, TFields>
      | IProxyGroup<TValue, TControl, TFields>
      | IProxyControl<TValue, TFields>
      ;
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
