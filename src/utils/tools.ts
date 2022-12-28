/**
 * 字符串首字母大写
 * @param str 源字符串
 * @returns 格式化之后的字符串
 */
export const firstToUpperCase = (str: string) => {
  return str.trim().toLowerCase().replace(/( |^)[a-z]/g, (F: string) => F.toUpperCase())
}