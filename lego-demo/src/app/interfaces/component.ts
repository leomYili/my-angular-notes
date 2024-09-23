export interface DeclarativeComponent {
  displayName: string;
  template?: string;
  selector: string;
  defaultStateTypes?: any;
  getDefaultState?: () => any;
  defaultListeners?: any;
  defaultIntercepters?: any;
  defaultWrappers?: any;
  initialize?: () => any;
  component: any;
  [key: string]: any;
}
