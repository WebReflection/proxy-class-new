const get = require('../cjs');

let constructed = 0;

const Class = new Proxy(class { static test = 'OK'; }, {
  construct(...args) {
    constructed++;
    return Reflect.construct(...args);
  },
  get(target, name, receiver) {
    const got = get(target, name, receiver);
    return got || target[name];
  }
});

console.assert(Class.test === 'OK');
console.assert(constructed === 0);
console.assert(Class.new() instanceof Class);
console.assert(constructed === 1);

const Arrow = new Proxy(Object.defineProperty(() => {}, 'new', {value: () => 'OK'}), {
  construct(...args) {
    constructed++;
    return Reflect.construct(...args);
  },
  get(target, name, receiver) {
    const got = get(target, name, receiver);
    return got || target[name];
  }
});

console.assert(Arrow.new()  === 'OK');
console.assert(constructed === 1);
