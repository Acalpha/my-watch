
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  const def = function (obj, key, value, enumerable)  {
    Object.defineProperty(obj, key, {
      value,
      enumerable,
      writable: true,
      configurable: true
    });
  };

  var uid$1 = 0;
  class Dep {
    constructor() {
      console.log('----->实例化Dep');

      this.subs = [];
      this.id = uid$1++;
    }
    // 添加订阅
    addSub(sub) {
      this.subs.push(sub);
    }

    depend() {
      if(Dep.target){
        this.addSub(Dep.target);
      }
    }

    // 通知
    notify() {
      const subs = [...this.subs];
      console.log('notify', subs);
      subs.forEach(v => v.update());
    }
  }

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
        val = newValue;
        observe(newValue);
        dep.notify();
      }
    });
  }

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

  const ArrayMethods = Object.create(arrayPrototype);

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
          inserted = arg.slice(2);
          break;
      }
      const ob = this.__ob__;
      if (inserted) {
        ob.observeArray(inserted);
      }
      ob.dep.notify();
      return res;
    });
  });

  class Observer {
    constructor(value) {
      this.dep = new Dep();
      console.log('Observer构造器', value);
      def(value, '__ob__', this, false);
      if (Array.isArray(value)) {
        Object.setPrototypeOf(value, ArrayMethods);
      } else {
        this.walk(value);
      }
    }
    walk(value){
      for(let k in value) {
        defineReactive(value, k);
      }
    }
    observeArray(arr) {
      for(let i = 0, l =arr.length;i<l;i++){
        observe(arr[i]);
      }
    }
  }

  function observe(value) {
    console.log('@@@@observe', value);
    if (typeof value != 'object') {
      return;
    }
    var ob;
    if (typeof value.__ob__ !== 'undefined'){
      ob = value.__ob__;
    } else {
      ob = new Observer(value);
    }
    return ob;
  }

  const pathPath = (str) => (obj) => str.split('.').reduce((p,n) => p ? p[n] : undefined,obj);
  var uid = 0;
  class Watcher {
    constructor(target, expression,callback) {
      this.id = uid++;
      this.target = target;
      this.getter = pathPath(expression);
      this.callback = callback;
      this.value = this.get();

      console.log('实例化Watcher');
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
        console.log(error);
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

  var obj = {
    a: {
      b: {
        c: '1'
      }
    },
    d: 123,
    g: [1,2,3]
  };
  observe(obj);
  // obj.g.splice(2,1,2,[3])
  // console.log(obj)

  // console.log(1)
  // obj.g.push('ss')
  // obj.b.c = 's'
  // console.log(obj.g.splice(1,1,[2,1,[2]]))
  // console.log(obj.g)
  new Watcher(obj, 'a.b.c', (val,old) => console.log('⭐️⭐️⭐️⭐️⭐️⭐️⭐️',val,old));
  obj.a.b.c = '11';
  obj.a.b.c = '112';

})));
