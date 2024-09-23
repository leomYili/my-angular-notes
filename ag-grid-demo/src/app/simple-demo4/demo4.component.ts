import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VirtualScrollingService } from './virtual-scrolling.service';

import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-simple-demo4',
  templateUrl: './demo4.component.html',
  styleUrls: ['./demo4.component.css'],
  providers: [VirtualScrollingService]
})
export class SimpleDemo4Component {
  @Input() index: number;
  data: any[] = [];

  constructor() {
    this.data = Array(50)
      .fill(0)
      .map(() => {
        return {
          name: faker.person.fullName(),
          bio: faker.string.uuid(),
          avatar: faker.image.url()
        };
      });
  }
}
