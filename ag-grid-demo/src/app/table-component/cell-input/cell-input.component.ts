import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AthBasicComponent } from '../component.basic';

export const CELL_INPUT = 'cell-input';

@Component({
  // todo 修改
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cell-input',
  templateUrl: './cell-input.component.html',
  styleUrls: ['./cell-input.component.css']
})
export class CellInputComponent extends AthBasicComponent implements OnInit {
  @Input() data: any;
  @Input() compProps: any;
  @Input() isRender!: boolean;
  // todo 修改
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<any>();

  value: any = null;
  emptyValue: string = '-';
  placeholder!: string;
  private readonly destroy$ = new Subject<void>();
  constructor(private cdr: ChangeDetectorRef) {
    super();
  }
  ngOnInit(): void {
    Object.assign(this, {
      value: this.data.value || ''
    });
  }
  onChange(result: any): void {
    this.change.emit({
      event: 'Change',
      value: result
    });
  }

  onFocus(): void {
    this.change.emit({
      event: 'Focus',
      value: this.value
    });
  }

  onBlur(): void {
    this.change.emit({
      event: 'Blur',
      value: this.value
    });
  }
}
