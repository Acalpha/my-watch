import Dep from "./Dep";

const pathPath = (str) => (obj) => str.split('.').reduce((p,n) => p ? p[n] : undefined,obj)
var uid = 0;
export default  class Watcher {
  constructor(target, expression,callback) {
    this.id = uid++;
    this.target = target;
    this.getter = pathPath(expression);
    this.callback = callback;
    this.value = this.get();

    console.log('实例化Watcher')
  }
  update() {
    this.run();
  }
  get() {
    Dep.target = this;
    const obj = this.target;
    let value;
    try {
      value = this.getter(obj);
    } catch (error) {
      console.log(error)
    } finally {
      Dep.target = null;
    }
    return value
  }
  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    const value = this.get();
    if(value !== this.value || typeof value === 'object') {
      const oldValue = this.value;
      this.value = value;
      cb.bind(this.target)(value, oldValue);
    }
  }
}