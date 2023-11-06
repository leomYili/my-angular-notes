import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-simple-item',
  templateUrl: './simple-item.component.html',
  styleUrls: ['./simple-item.component.css']
})
export class SimpleItemComponent implements OnInit {
  @Input() index: number;
  @Input() question!: any;
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
