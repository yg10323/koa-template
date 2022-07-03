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
 * @returns true | undefined
 */
const checkSheetName = (str) => {
  // 判断字符串包含中文或是否以数字开头
  if (new RegExp("[\u4E00-\u9FA5]+").test(str) || new RegExp("^[0-9]").test(str)) {
    return false
  }
  return true
}


module.exports = {
  filterRepeatData,
  checkSheetName
}