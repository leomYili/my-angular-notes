import { Component } from '@angular/core';
import { Root1Component } from './components/demo/root1/root1.component';
import { Text1Component } from './components/demo/text1/text1.component';

/**
 * 独立组件式写法固然好,但需要升级整个前端框架,复杂度不小
 * 后续可以采用service的方法,简单做个存储,写法上复杂一些,但基本功能还是可以实现的
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'lego-demo';

  card1 = {
    name: 'jim',
    age: 11,
  };

  card2 = {
    name: 'tom',
    age: 22,
    root: Root1Component,
  };

  card3 = {
    name: 'koko',
    age: 34,
    text: Text1Component,
  };
}
