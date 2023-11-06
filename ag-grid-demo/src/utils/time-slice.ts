class requestIdleCallback {
  private activeTime = 50; // 每帧的时间,默认取最好的性能

  private deadLineTime: number; // 每帧的时间

  private pendingCallback: any; // 真实执行的函数回调

  private channel = new MessageChannel();

  constructor() {
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

      // 会在浏览器空闲时再去执行对应脚本,且如果
      if ((didTimeout || this.timeRemaining() > 0) && this.pendingCallback) {
        this.pendingCallback({
          didTimeout,
          timeRemaining: this.timeRemaining
        });
      }
    };
  }

  // 模拟实现的requestIdleCallback,规范中的已限定时间,这里可通过实际需求去修改
  main(cb: any) {
    window.requestAnimationFrame(rafTime => {
      // 每一帧开始时间加上16.6就是截止时间,建议最大时间在50ms,根据不同的hooks分别去设置一个时间
      this.deadLineTime = rafTime + this.activeTime;
      this.pendingCallback = cb;
      // 添加一个宏任务,绘制结束以后执行,这里只是为了启动消息发送
      this.channel.port1.postMessage('hello');
    });
  }
}

/**
 * 这里不仅仅是时间切片了,还需要用到react fiber的协作式调度思想
 * @param gen
 * @returns
 */
export function timeSlice(gen: any): any {
  const _requestIdleCallback = new requestIdleCallback();

  if (typeof gen !== 'function')
    throw new Error('TypeError: the param expect a generator function');
  var g = gen();
  if (!g || typeof g.next !== 'function') return;

  return function next() {
    var start = performance.now();
    var res = null;
    do {
      res = g.next();
    } while (res.done !== true && performance.now() - start < 25);
    if (res.done) return;
    // @ts-ignore
    _requestIdleCallback.main(next);
  };
}
