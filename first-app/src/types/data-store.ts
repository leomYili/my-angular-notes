export interface DataStore<K, V> {
  readonly size: number;
  get: (key: string) => any;
  set: (key: string) => boolean;
  has: (key: string) => boolean;
  delete: (key: string) => boolean;
  forEach(
    callbackfn: (value: V, key: string) => void,
    thisArg?: any
  ): void;
  /**
   * @param proxy 代理store对象,可以手动进行操作
   * @returns 
   */
  subscribe:(proxy:any) => void
}
