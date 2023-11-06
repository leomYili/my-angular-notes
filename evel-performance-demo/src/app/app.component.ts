import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  script: string = '';

  result: any;

  private activeTime = 16.6; // 每帧的时间,默认取最好的性能

  private deadLineTime: number; // 每帧的时间

  private pendingCallback: any; // 真实执行的函数回调

  private channel = new MessageChannel();

  ngOnInit(): void {
    this.performUnitOfWork();
  }

  timeRemaining() {
    return this.deadLineTime - performance.now();
  }

  performUnitOfWork() {
    this.channel.port2.onmessage = () => {
      let currentTime = performance.now();
      // 帧的截止时间是否小于当前时间,小于时,当前帧已过期
      let didTimeout = this.deadLineTime <= currentTime;

      console.log(didTimeout, this.timeRemaining());

      // 会在浏览器空闲时再去执行对应脚本,且如果
      if ((didTimeout || this.timeRemaining() > 0) && this.pendingCallback) {
        this.pendingCallback({
          didTimeout,
          timeRemaining:this.timeRemaining,
        });
      }
    };
  }

  // 模拟实现的requestIdleCallback,规范中的已限定时间,这里可通过实际需求去修改
  requestIdleCallback(cb: any) {
    window.requestAnimationFrame((rafTime) => {
      console.log(rafTime);
      // 每一帧开始时间加上16.6就是截止时间,建议最大时间在50ms,根据不同的hooks分别去设置一个时间
      this.deadLineTime = rafTime + this.activeTime;
      this.pendingCallback = cb;
      // 添加一个宏任务,绘制结束以后执行,这里只是为了启动消息发送
      this.channel.port1.postMessage('hello');
    });
  }

  run(obj?: any) {
    try {
      let expression = `
        let window = undefined;
        let document = undefined;
        let alert = undefined;
        ${this.script}`;

      let func = new Function(expression);
      console.info("结果:",func());

      const endTime = this.timeRemaining();

      if (endTime < 0) {
        console.warn(`当前结束时间为${endTime},已超过浏览器最大渲染帧数时间间隔,这段代码性能较差`);
      }
    } catch (error) {
      console.warn('已超过浏览器最大渲染帧数时间间隔,这段代码性能较差');
      console.error(error);
    }
  }

  // 下面就是模拟的例子

  setScript(value: string) {
    this.script = value;
    this.requestIdleCallback(this.run());
  }

  // 执行一段简单的脚本
  onSimpleScript() {
    this.script =
      'let a=55;let b=2;let c=3;let d = 5; console.log(a*b+c-d);return a*b+c-d';
    this.requestIdleCallback(this.run);
  }

  // 执行一段复杂的脚本
  onMuScript() {
    this.script =
    "// 创建一个长度为1000000的随机整数数组\nlet arr = [];\nfor (let i = 0; i < 1000000; i++) {\n  arr.push(Math.floor(Math.random() * 100));\n}\n\n// 对数组进行排序，并取出前10个元素\nlet start = performance.now();\nlet result = arr.sort((a, b) => a - b).slice(0, 10); // 排序并截取\nend = performance.now();\nduration = end - start;\nconsole.log('The first 10 elements of the sorted array are ' + result);\nconsole.log('It took ' + duration + ' milliseconds');\nreturn result";
    this.requestIdleCallback(this.run);
  }
}
