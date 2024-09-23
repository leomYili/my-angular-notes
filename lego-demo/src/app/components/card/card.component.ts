import { Component, Input, Output, EventEmitter } from '@angular/core';

import { RootComponent } from './root/root.component';
import { TextComponent } from './text/text.component';

import { SlotComponent } from '../../wrap/slot.component';

interface StateTypes {
  name: string;
  age: number;
}

export const displayName = '卡片';

export const selector = 'app-card';

export const defaultStateTypes = {
  name: 'string',
  age: 'number',
};

export const getDefaultState = (): StateTypes => ({
  name: '',
  age: 0,
});

export const defaultWrappers = {
  root: RootComponent,
  text: TextComponent,
};

@Component({
  standalone: true,
  selector,
  imports: [SlotComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
class CardComponent {
  @Input() props!: any;
  @Input() state!: StateTypes;

  @Output() setState = new EventEmitter<any>();

  modifyName() {
    console.log(this.state);
    this.setState.emit({ ...this.state, name: '写死的修改值' });
  }
}

export const component = CardComponent;
