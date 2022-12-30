const CONSTS_DEFAULT_CONFIG = require('./config')
const CONSTS_CONFIG = require('./services')

class MakeConst {
  constructor (config) {
    this.consts = {}
    this.register(config)
  }

  register (config) {
    Object.keys(config).forEach(namespace => {
      this._build(namespace, config[namespace])
    })
  }

  _build (namespace, config) {
    const { sep } = CONSTS_DEFAULT_CONFIG
    config.forEach(item => {
      const { name, value } = item
      const constName = `${namespace.toUpperCase()}${sep}${name}`
      Object.defineProperty(this.consts, constName, { value, writable: true })
    })
  }
}

module.exports = new MakeConst(CONSTS_CONFIG)['consts']