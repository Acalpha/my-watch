var uid = 0;
export default class Dep {
  constructor() {
    console.log('----->实例化Dep');

    this.subs = [];
    this.id = uid++;
  }
  // 添加订阅
  addSub(sub) {
    this.subs.push(sub);
  }

  depend() {
    if(Dep.target){
      this.addSub(Dep.target)
    }
  }

  // 通知
  notify() {
    const subs = [...this.subs];
    console.log('notify', subs);
    subs.forEach(v => v.update())
  }
}