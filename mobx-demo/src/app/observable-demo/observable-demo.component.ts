import { Component, OnInit } from '@angular/core';
import {
  observable,
  autorun,
  reaction,
  action,
  when,
  runInAction,
  computed,
  trace,
} from 'mobx';

@Component({
  selector: 'app-observable-demo',
  templateUrl: './observable-demo.component.html',
  styleUrls: ['./observable-demo.component.css'],
})
export class ObservableDemoComponent implements OnInit {
  private titleObj = {
    title: 'find a decent task management system',
    done: false,
    num: 1,
  };

  private list = ['high prio', 'medium prio', 'low prio'];

  obsTitle: any;

  obsList: any;

  constructor() {
    this.obsTitle = observable(this.titleObj);
    this.obsList = observable(this.list);
  }

  ngOnInit(): void {
    autorun(() => {
      console.log(
        '只有title受影响才会被触发,这里可以把num去掉',
        this.obsTitle.title
      );

      runInAction(() => {
        this.obsTitle.num++;
      });
    });

    reaction(
      () => this.obsList.length,
      (length, prevValue) => {
        console.log('只有list受影响才会被触发', length);

        // Reaction doesn't converge to a stable state after 100 iterations. Probably there is a cycle in the reactive function: Reaction[Reaction@4]
        /* runInAction(() => {
          this.obsList.push('aaaa');
        }); */
      }
    );

    when(
      () => this.obsList.length === 50,
      () => {
        console.log(
          '只会被触发一次,因为这里的规则是一次性的,同时运行完毕就会自动清除'
        );
      }
    );
  }

  onClick1(event: any) {
    const increment = action((state: { title: string; num: number }) => {
      state.title = '已被修改为中文';
      state.num++;
    });

    increment(this.obsTitle);
  }

  onClick2(event: any) {
    const increment = action((state: any) => {
      state.push('prio: for fun');
    });

    increment(this.obsList);

    console.log(this.obsList.length);
  }
}
