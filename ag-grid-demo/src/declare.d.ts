declare module 'stream' {
  export type Stream = any;
}

declare module 'events' {
  export type EventEmitter = any;
}

declare namespace NodeJS {
  export type TypedArray = any;
}