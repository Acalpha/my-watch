import {def} from './utils';
import defineReactive from './defineReactive'
import { ArrayMethods } from './array'
import Dep from './Dep'
import observe from './observe';

export default class Observer {
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
      defineReactive(value, k)
    }
  }
  observeArray(arr) {
    for(let i = 0, l =arr.length;i<l;i++){
      observe(arr[i])
    }
  }
}
