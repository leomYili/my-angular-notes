import {
  FormControlState,
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

import { IProxyGroup } from './data-proxy-group';
import { IProxyArray } from './data-proxy-array';

export interface IProxyControl<TValue, PFields> {
  parent: IProxyArray<TValue, any, PFields> | IProxyGroup<TValue, any, PFields> | null;

  value: TValue;
  status: string; // 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
  dirty: boolean;
  disabled: boolean;
  valid: boolean;
  invalid: boolean;
  pending: boolean;
  enabled: boolean;
  _prevValue: TValue; // 内部属性，视定制使用情况决定是否开启
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
  getRawValue(): TValue;
  addValidators(validators: ValidatorFn | ValidatorFn[]): void;
  addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void;
  removeValidators(validators: ValidatorFn | ValidatorFn[]): void;
  removeAsyncValidators(
    validators: AsyncValidatorFn | AsyncValidatorFn[]
  ): void;
  disable(opts: { onlySelf?: boolean; emitEvent?: boolean }): void;
  enable(opts: { onlySelf?: boolean; emitEvent?: boolean }): void;
  updateValueAndValidity(opts: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;
  setErrors(errors: ValidationErrors, opts: { emitEvent?: boolean }): void;
  getError(errorCode: string, path?: string | (string | number)[]): any;
  hasError(errorCode: string, path?: string | (string | number)[]): boolean;
  getOldValue(): TValue; // 内部方法，获取初始值
}
