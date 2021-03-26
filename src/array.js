import observe from "./observe";
import { def } from "./utils";

const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];
const arrayPrototype = Array.prototype;

export const ArrayMethods = Object.create(arrayPrototype);

methodsNeedChange.forEach(methodName => {
  const original = arrayPrototype[methodName];
  def(ArrayMethods, methodName, function(...arg) {
    console.log('重写了数组',methodName);
    const res = original.bind(this)(...arg);
    let inserted = [];
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = arg;
        break;
      case 'splice':
        inserted = arg.slice(2)
        break;
      default:;
    }
    const ob = this.__ob__;
    if (inserted) {
      ob.observeArray(inserted);
    }
    ob.dep.notify();
    return res;
  });
})