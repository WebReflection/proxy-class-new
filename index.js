const { construct } = Reflect;

var index = (target, name) => (
  // operations meant to be in this order:
  name === 'new' &&               // fail fast
  typeof target === 'function' && // type check
  !(name in target)               // crawl props
) ? New : void 0;

function New() {
  return construct(this, arguments);
}

export { index as default };
