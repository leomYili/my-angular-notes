import { ProxyComponentInstance } from 'src/types/component-hooks';
import { CommonData } from './common';
import { HookOptions, IDataControl } from 'src/types/data-control-hooks';

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

class fieldA<TValue> extends CommonData<TValue, PageDataFields> {
  path = 'project';

  override valueChanges(component: ProxyComponentInstance<TValue, PageDataFields>, control: IDataControl<TValue, PageDataFields>, currentData: PageDataFields, options: HookOptions): void {
    
  }
}
