//将对象冻结，使用Object.freeze方法。
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;

//----------------------------------
//上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。
//除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};

//Object.keys(obj)只获得可枚举（enumerable:true）属性的名字数组，若对对象的属性的可枚举性使用Object.defineProperty()改变为false，则报错
function constantize(obj){
    Object.freeze(obj);//会把obj对象属性冻结
    Object.keys(obj).forEach(key => {
    if(typeof obj[key] === 'object'){
        constantize(obj[key]);
        }
    })
}
const obj = {
    m: 1,
    s: {
      k: '123',
      l: 66
    },
    q: {
      i: 0,
      o: 21
    }
}
//改变对象属性的描述
Object.defineProperty(obj,"q",{
     enumerable: false
});
constantize(obj.q.i);//0
obj.q.i = 3;
console.log(obj.q.i);//3
/*Object.getOwnPropertyNames()可以获得所有的对象属性名。
用于替换Object.keys()方法*/
*/
