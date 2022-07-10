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

/**
 * 
 * @param {excel的sheet名称} sheetName 
 * @returns boolean
 */
const checkSheetName = (sheetName) => {
  if (new RegExp("[\u4E00-\u9FA5]+").test(sheetName) || new RegExp("^[0-9]").test(sheetName)) {
    return true
  }
}

const fs = require('fs');
const path = require('path');

/**
 * 删除文件
 * @param {文件/文件夹绝对路径} path 
 * @returns 
 */
const clearFile = (absPath) => {
  if (!path.isAbsolute(absPath)) return;
  absPath = absPath.split('\\').join('/')
  const isFile = fs.lstatSync(absPath).isFile()
  if (isFile) {
    fs.unlinkSync(absPath)
    return true
  } else {
    const files = fs.readdirSync(absPath)
    files.forEach(file => {
      const path = `${absPath}/${file}`
      clearFile(path)
    })
  }
  return true
}


const ejs = require('ejs')
// const template = require('./src/template/index.ejs')
// const template = ejs.fileLoader('./src/template/controller.ejs')
// const res = ejs.render(template.toString(), {
//   config: {
//     tableName: 'user',
//     createData: JSON.stringify({ firstName: "Jane", lastName: "Doe" })
//   },
//   // 指定函数文件位置
//   filename: './src/template/functions.ejs'
// })
// fs.appendFileSync('./user.js', res)
const tableNames =['user']
tableNames.forEach(tableName => {
  fs.readdirSync(path.join(__dirname, './src/template')).forEach(file => {
    if (file === 'index.ejs' || file === 'function.ejs' || file === 'index.js') return
    const template = ejs.fileLoader(path.join(__dirname, `./src/template/${file}`))
    const pathName = file.split('.')[0]
    const res = ejs.render(template.toString(), {
      config: { tableName },
      filename: './src/template/functions.ejs'
    })
    console.log(res);
    // console.log(path.join(__dirname, '../template/functions.ejs'));
    // // 判断是不是已经存在对应的文件，存在则直接返回
    // fs.readdirSync(path.join(__dirname, `../${pathName}`)).forEach(file => {
    //   if (file.split('.')[0] === `${pathName}`) return
    //   fs.writeFileSync(path.join(__dirname, `../${pathName}/${tableName}.${pathName}.js`), res)
    // })
  })
})

/**
 * 字符串首字母大写
 * @param {} str 
 * @returns 
 */
const firstToUpperCase = (str) => {
  return str.trim().toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

// console.log(firstToUpperCase(' nihao ya '));