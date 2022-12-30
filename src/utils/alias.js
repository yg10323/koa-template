/**
 * 别名配置
 */
const path = require('path')
const process = require('process')

const solveDependences = (pathMap) => {
  let cache = {}
  function solve (name) {
    if (!cache[name]) {
      if (cache[name] === '') {
        throw new Error('在名称映射的定义中出现循环依赖')
      }
      cache[name] = ''
      cache[name] = pathMap[name]
        .split(/[\\/]/g)
        .map(s => (pathMap[s] ? solve(s) : s))
        .join('/')
    }
    return cache[name]
  }

  for (let name in pathMap) {
    solve(name)
  }
  return cache
}

module.exports = function (root, map) {
  root = root || process.cwd()
  if (!path.isAbsolute(root)) {
    throw new Error('根路径必须是绝对路径')
  }
  let pathMap = { '~': root }
  for (let name in map) {
    pathMap['@' + name] = map[name]
  }
  let cache = solveDependences(pathMap)
  const old = module.__proto__.require
  module.__proto__.require = function (id) {
    return old.apply(this, [
      id.split(/[\\/]/g)
        .map(function (s) {
          if (s.startsWith('::')) {
            return s.substring(1)
          } else return cache.hasOwnProperty(s) ? cache[s] : s
        })
        .join('/'),
    ])
  }
  return old
}