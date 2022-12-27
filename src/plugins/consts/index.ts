import fs from 'fs'
import path from 'path'
import CONSTS_DEFAULT_CONFIG from './config'

type Config = {
  [propsName: string]: any
}

type Options = {
  sep: string
}

class MakeConst {
  consts: any
  options: Options

  constructor () {
    this.consts = {}
    this.options = CONSTS_DEFAULT_CONFIG
    this.register()
  }

  register () {
    const CONSTS_CONFIG: any = {}
    const absPath = path.resolve(__dirname, './service')
    const modlues = fs.readdirSync(absPath)

    modlues.forEach((fileName: string) => {
      const constsName = fileName.split('.')[0]
      if (constsName === 'index') return
      const config = require(`${absPath}/${fileName}`).default
      CONSTS_CONFIG[constsName] = config
    })
    Object.keys(CONSTS_CONFIG).forEach((namespace: string) => {
      this._build(namespace, CONSTS_CONFIG[namespace])
    })
  }

  _build (namespace: string, config: any[]) {
    const { sep } = this.options
    config.forEach((consts: Config) => {
      const { name, value } = consts
      const constName = `${namespace.toUpperCase()}${sep}${name}`
      Object.defineProperty(this.consts, constName, { value })
    })
  }
}

const $consts = new MakeConst()
export default $consts['consts']