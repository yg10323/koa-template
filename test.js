const data = [
  { name: 'codery', age: 12 },
  { name: 'lili', age: 18 },
  { name: 'codery', age: 32 },
  { name: 'wuwu', age: 19 },
  { name: 'lili', age: 23 },
]

const complexData = [
  {
    hobby: [{ name: { age: 1 } }, 'dance', 'play games'],
    age: 18
  },
  {
    hobby: [{ name: { age: 1 } }, 'dance', 'play games'],
    age: 20
  }
]



/**
 * 根据属性值过滤对象数组中重复的成员项
 * @param {源对象数组} dataArr 
 * @param {根据哪个key过滤} key 
 * @returns 过滤重复项后的新数组对象
 */
const filterRepeatData = (dataArr, key) => {
  const arr = []
  const finalData = dataArr.map((item) => {
    if (arr.includes(JSON.stringify(item[key]))) return
    arr.push(JSON.stringify(item[key]))
    return item
  })
  return finalData.filter(data => data)
}


// const path = require('path')
// console.log(path.join(__dirname, '../'));
// console.log(path.join(__dirname, './src'));


const obj = {
  fun: function (name) {
    console.log(name);
    console.log('origin: fun');
  }
}


const old = obj.fun

obj.fun = (name) => {
  console.log(this);
  return old.apply(this, name)
}


old('12')
// console.log(old);
// console.log(obj.fun);
const path = require('path');

console.log(path.join(__dirname, './src'));

console.log(path.basename('test.js'));
console.log(path.extname('test.js'));

