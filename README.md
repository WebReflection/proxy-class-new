# proxy-class-new

This module is a less powerful and slightly more error prone alternative to the [@ungap/new](https://github.com/ungap/new#readme) proposal.

It provides a *Proxy* `get` trap that returns `undefined` or a `function`, in case the intent is to provide a way to instantiate `Class.new(...args)` in the wild.

See [this TC39 proposal](https://es.discourse.group/t/function-prototype-new/1772) to know more.

```js
import newClass from 'proxy-class-new';

const Class = new Proxy(class {}, {
  get(target, name) {
    return newClass(target, name) || target[name];
  }
});
```

The default export returns a function that does the following checks in an unobtrusive way:

  * the `name` is identical to `"new"` string
  * the `typeof target` is exactly `"function"`
  * no `"new" in target` exists already

If these requirements are fulfilled, an always same function able to be used to instantiate the instance is returned, otherwise the returned value is *undefined*.
