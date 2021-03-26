import observe from './observe';
import Dep from './Dep';

function defineReactive(data, key, _val) {
  var val = _val || data[key];
  var dep =  new Dep();
  console.log('~~~defineReactive===>', key, val);
  const childOb = observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('~~~你想获取' + key);
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val;
  
    },
    set(newValue) {
      console.log('~~~你把' + key + '改成了'+ newValue);
      if(newValue === val) {
        return
      }
      val = newValue
      observe(newValue);
      dep.notify();
    }
  })
}
export default defineReactive;