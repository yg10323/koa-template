/**
 * 字符串首字母大写
 * @param {} str 
 * @returns 
 */
const firstToUpperCase = (str) => {
  return str.trim().toLowerCase().replace(/( |^)[a-z]/g, (F) => F.toUpperCase());
}

module.exports = {
  firstToUpperCase
}