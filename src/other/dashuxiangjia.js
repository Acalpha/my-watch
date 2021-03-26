

const num1 = '12313123213213123123';
const num2 = '12313123213213123123';
const arr1 = num1.split('');
const arr2 = num1.split('');
const resArr = [];
let temp = 0;
const zeroCheck = (num) => +num || 0;
while(arr1.length > 0 && arr2.length> 0){
  const a = zeroCheck(arr1.pop()) + zeroCheck(arr2.pop()) + temp;
  console.log(a%10, a / 10)
  resArr.push(a%10);
  temp = Math.floor(a / 10)
}
if(temp) {
  resArr.push(temp);
}
const a = resArr.reduceRight((n,p)=>n+p,'');
console.log(a)