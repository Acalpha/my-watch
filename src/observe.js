import Observer from './Observer'

export default function observe(value) {
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