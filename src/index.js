// import observe from './observe'
// import Watcher from './Watcher'

// var obj = {
//   a: {
//     b: {
//       c: '1'
//     }
//   },
//   d: 123,
//   g: [1,2,3]
// }
// observe(obj);
// // obj.g.splice(2,1,2,[3])
// // console.log(obj)

// // console.log(1)
// // obj.g.push('ss')
// // obj.b.c = 's'
// // console.log(obj.g.splice(1,1,[2,1,[2]]))
// // console.log(obj.g)
// new Watcher(obj, 'a.b.c', (val,old) => console.log('⭐️⭐️⭐️⭐️⭐️⭐️⭐️',val,old))
// obj.a.b.c = '11'
// obj.a.b.c = '112'


// const a = s => {
//   if(!s) return false;
//   const inArr = ['(', '[','{'];
//   const outArr = [')', ']','}'];
//   const arr = s.split('');
//   let temp = [];
//   for (let i = 0; i < arr.length; i++){
//     const nowS = arr[i];
//     console.log('nowS',nowS, nowS.indexOf(inArr), nowS.indexOf(outArr))
//     if(inArr.indexOf(nowS) >= 0) {
//       temp.push(inArr.indexOf(nowS));
//     }
//     if(outArr.indexOf(nowS) >= 0) {
//       if (
//         temp.length <= 0 ||
//         temp.pop() !== outArr.indexOf(nowS)
//       ) {
//         return false;
//       }
//     }
//   }
//   if(temp.length > 0) return false;
//   return true;
// }



// let a = s => {
//   const temp = [];
//   const checkObj = {
//     '}': '{',
//     ']': '[',
//     ')': '('
//   }
//   for (let i = 0; i < s.length; i++) {
//     console.log(i)
//     switch(s[i]) {
//       case '{':
//       case '[':
//       case '(':
//         temp.push(s[i]);
//         break;
//       case '}':
//       case ']':
//       case ')':
//         if(temp.length === 0 || temp.pop() !== checkObj[s[i]]) {
//           return false;
//         }
//         break;
//       default:;
//     }
//   }
  
//   if (temp.length > 0) return false;
  
//   return true;
// }

// const res = a('([={])');
// console.log(res)


// function sleep(time) {
//   return Promise((res,rej) => {
//     window.setTimeout(() => {
//       res();
//     }, time * 5)
//   })
// }


const arr = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');

function a(num, base, _arr) {
  const arr = _arr || [];
  const remainder = num % base;
  const newNum = Math.floor(num / base);
  arr.push(remainder);
  if (newNum > 0) {
    a(newNum, base, arr);
  }
  return arr;
}
const num = 122299999999;
const b = num => a(num, 36).reverse().map(v => arr[v]).join('');
console.log(b(num), parseInt(num).toString(36), b(num) === parseInt(num).toString(36));

const obj = {};
'0123456789abcdefghijklmnopqrstuvwxyz'.split('').forEach((v,i) => {
  obj[v] = i;
})
function bb(str) {
  console.log(str)
  let num = 0;
  for(let i = str.length - 1; i > -1; i--){
    console.log(i, str[i], obj)
    num += obj[str[i]] * Math.pow(36,str.length - 1 - i)
  }
  return num;
}

console.log(num, b(num),bb(b(num)))