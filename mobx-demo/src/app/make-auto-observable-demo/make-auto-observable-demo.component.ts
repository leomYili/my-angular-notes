import { Component, OnInit } from '@angular/core';
import { makeAutoObservable } from 'mobx';

class Doubler {
  value;

  constructor(value: any) {
    makeAutoObservable(this);
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment() {
    this.value++;
  }
}

@Component({
  selector: 'app-make-auto-observable-demo',
  templateUrl: './make-auto-observable-demo.component.html',
  styleUrls: ['./make-auto-observable-demo.component.css'],
})
export class MakeAutoObservableDemoComponent implements OnInit {
  obsNum: any;

  constructor() {
    this.obsNum = new Doubler(12);
  }

  ngOnInit(): void {
    this.obsNum.increment();

    console.log(this.obsNum.double);
  }
}
