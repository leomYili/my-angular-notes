import { Component } from '@angular/core';

import Sandbox from './sandbox';

@Component({
  selector: 'app-window1',
  standalone: true,
  templateUrl: './window1.component.html',
  styleUrls: ['./window1.component.css'],
})
export class Window1Component {
  sandbox;

  name = 'window1';

  source = {
    scripts: [
      {
        code: "window.globalStr = 'child';console.log(window.globalStr);window.addEventListener('scroll',() => {console.log('child Event listener')})",
      },
    ],
  };

  constructor() {
    this.sandbox = new Sandbox(this.name);
  }

  mount() {
    this.sandbox.start();
    // 执行js
    this.source.scripts.forEach((info) => {
      (0, eval)(this.sandbox.bindScope(info.code));
    });
  }

  unmount(destory: any) {
    this.sandbox.stop();
    // destory为true，则删除应用
    if (destory) {
      // doSomeThing 可以做缓存或者其他操作
    }
  }
}
