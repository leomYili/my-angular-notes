import { ProxyComponentInstance, HookOptions } from 'src/types/component-hooks';
import { CommonComponent } from './common';
import { IDataControl } from 'src/types/data-control-hooks';

interface PageDataFields {
  project: [
    {
      project_info: {
        /**
         * 编号
         */
        d_no: string;

        orderDetail: [{ name: string; desc: string }];
      };
    }
  ];
}

class InputComponent<TValue> extends CommonComponent<TValue, PageDataFields> {
  path = 'project';

  override afterInit(component: ProxyComponentInstance<TValue, PageDataFields>, control: IDataControl<TValue, PageDataFields>, currentData: PageDataFields, options: HookOptions): void {
    var doc_no = currentData.project[0].project_info.d_no;

    console.log(control.parent?.controls["s"].dirty);
  }

  override valueChanges(component: ProxyComponentInstance<TValue, PageDataFields>, control: IDataControl<TValue, PageDataFields>, currentData: PageDataFields, options: HookOptions): void {
    
  }
}
