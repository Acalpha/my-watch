import observe from './observe'
import Watcher from './Watcher'

var obj = {
  a: {
    b: {
      c: '1'
    }
  },
  d: 123,
  g: [1,2,3]
}
observe(obj);
// obj.g.splice(2,1,2,[3])
// console.log(obj)

// console.log(1)
// obj.g.push('ss')
// obj.b.c = 's'
// console.log(obj.g.splice(1,1,[2,1,[2]]))
// console.log(obj.g)
new Watcher(obj, 'a.b.c', (val,old) => console.log('⭐️⭐️⭐️⭐️⭐️⭐️⭐️',val,old))
obj.a.b.c = '11'
obj.a.b.c = '112'



