export function mapValues(obj: any, handler: any) {
  const result: any = {};
  Object.keys(obj).forEach((key) => {
    result[key] = handler(obj[key], key);
  });
  return result;
}

export function each(obj: any, fn: any) {
  return obj.forEach((k: any) => {
    fn(obj[k], k);
  });
}

export function pick(obj: any, names: any) {
  const output: any = {};

  if (typeof names === 'function') {
    for (const name in obj) {
      if (names(obj[name], name, obj)) {
        output[name] = obj[name];
      }
    }
  } else {
    names.forEach((name: string) => {
      output[name] = obj[name];
    });
  }

  return output;
}

export function inject(fn: any, createArgsToInject: any, spread = false) {
  return (...runtimeArgs: any) => {
    const injectArgs = createArgsToInject(...runtimeArgs);
    return spread
      ? fn(...injectArgs, ...runtimeArgs)
      : fn(injectArgs, ...runtimeArgs);
  };
}

export function partialRight(fn: any, ...argv: any) {
  // @ts-ignore
  return (...rest: any) => fn.call(this, ...rest, ...argv);
}
