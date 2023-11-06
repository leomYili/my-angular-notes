import { HttpClient } from '@angular/common/http';
import { EspApi } from './esp-api';
import * as Dayjs from './dayjs.utils';
import * as _ from 'lodash';
import {
  NzMessageService,
  NzMessageDataOptions,
  NzMessageRef,
} from 'ng-zorro-antd/message';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  BaseModalContainerComponent,
  ModalOptions,
  NzModalContainerComponent,
  NzModalRef,
  NzModalService,
} from 'ng-zorro-antd/modal';
import { Direction } from '@angular/cdk/bidi';
import {
  EventEmitter,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

import {
  NzButtonShape,
  NzButtonSize,
  NzButtonType,
} from 'ng-zorro-antd/button';

export type OnClickCallback<T> = (
  instance: T
) => (false | void | {}) | Promise<false | void | {}>;

export type ModalTypes = 'default' | 'confirm'; // Different modal styles we have supported

export type ConfirmType = 'confirm' | 'info' | 'success' | 'error' | 'warning'; // Subtypes of Confirm Modal

export interface StyleObjectLike {
  [key: string]: string;
}

interface MessageCustom {
  custom(
    content: string | TemplateRef<void>,
    options?: NzMessageDataOptions
  ): NzMessageRef;
  addIndex(): void;
}

interface ModalCustom {
  prompt<T, R = NzSafeAny>(
    config: AthModalOptions<T, R>,
    required?: boolean,
    defaultContent?: string,
    supportInfo?: string
  ): NzModalRef<T, R>;
  confirm<T>(
    options: AthModalOptions<T>,
    confirmType: ConfirmType
  ): NzModalRef<T>;
  create<T, R = NzSafeAny>(
    config: AthModalOptions<T, R>,
    modalGridConfig?: ModalGridConfig
  ): NzModalRef<T, R>;
}

const noopFun = () => void 0;

export interface ModalButtonOptions<T = NzSafeAny> {
  label: string;
  type?: NzButtonType;
  danger?: boolean;
  shape?: NzButtonShape;
  ghost?: boolean;
  size?: NzButtonSize;
  autoLoading?: boolean; // Default: true, indicate whether show loading automatically while onClick returned a Promise

  // [NOTE] "componentInstance" will refer to the component's instance when using Component
  show?:
    | boolean
    | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  loading?:
    | boolean
    | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean); // This prop CAN'T use with autoLoading=true
  disabled?:
    | boolean
    | ((this: ModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
  onClick?(
    this: ModalButtonOptions<T>,
    contentComponentInstance?: T
  ): NzSafeAny | Promise<NzSafeAny>;
  [key: string]: NzSafeAny;
}

export interface ModalGridConfig {
  /**
   * 弹窗所占栅格列数（columns）<br>
   * 指弹窗内容区域总宽度所占栅格列数，弹窗实际的宽度 = 两侧内边距24px*2 + 栅格列数
   */
  span?: number;
  /**
   * 弹窗类型 <br>
   * table-modal: 小于1440分辨率，弹窗最小宽度仍沿用1440下10个栅格+边距的尺寸 <br>
   * form-modal: 1366以下分辨率沿用1366的栅格规则
   */
  modalType?: AthGridModalType;
}

export type AthGridModalType = 'table-modal' | 'form-modal';

export class AthModalOptions<T = NzSafeAny, R = NzSafeAny> {
  nzCentered?: boolean = false;
  nzClosable?: boolean = true;
  nzOkLoading?: boolean = false;
  nzOkDisabled?: boolean = false;
  nzCancelDisabled?: boolean = false;
  nzCancelLoading?: boolean = false;
  nzNoAnimation?: boolean = false;
  nzAutofocus?: 'ok' | 'cancel' | 'auto' | null = 'auto';
  nzMask?: boolean;
  nzMaskClosable?: boolean;
  nzKeyboard?: boolean = true;
  nzZIndex?: number = 1000;
  nzWidth?: number | string = 520;
  nzCloseIcon?: string | TemplateRef<void> = 'close';
  nzOkType?: NzButtonType = 'primary';
  nzOkDanger?: boolean = false;
  nzModalType?: ModalTypes = 'default';
  nzOnCancel?: EventEmitter<T> | OnClickCallback<T> = noopFun;
  nzOnOk?: EventEmitter<T> | OnClickCallback<T> = noopFun;
  nzComponentParams?: Partial<T>;
  nzMaskStyle?: StyleObjectLike;
  nzBodyStyle?: StyleObjectLike;
  nzWrapClassName?: string;
  nzClassName?: string;
  nzStyle?: object;
  nzTitle?: string | TemplateRef<{}>;
  nzFooter?: string | TemplateRef<{}> | Array<ModalButtonOptions<T>> | null; // Default Modal ONLY
  nzCancelText?: string | null;
  nzOkText?: string | null;
  nzContent?: string | TemplateRef<NzSafeAny> | Type<T>;
  nzCloseOnNavigation?: boolean;
  nzViewContainerRef?: ViewContainerRef;
  // Template use only
  nzAfterOpen?: EventEmitter<void>;
  nzAfterClose?: EventEmitter<R>;

  // Confirm
  nzIconType?: string = 'question-circle';
  nzDirection?: Direction;
  info?: any[] = [];

  draggable?: boolean = false;
  /**
   * 弹窗栅格参数
   */
  gridConfig?: ModalGridConfig;
}

export interface Utils {
  http: HttpClient;
  espApi: EspApi;
  athModalService: NzModalService & ModalCustom;
  athMessageService: NzMessageService & MessageCustom;
  lodash: typeof _;
  dayjs: typeof Dayjs;
}
