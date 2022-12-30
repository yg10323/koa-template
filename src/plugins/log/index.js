const log4js = require('log4js')
const path = require('path')
const LEVELS = require('./config')

class MakeLog {
  constructor () {
    this.logs = {}
    this._build()
  }

  _build () {
    log4js.configure({
      appenders: {
        console: { type: 'console', layout: { type: 'colored' } },
        errorLog: {
          type: 'file',
          filename: path.join(__dirname, './services/errorLog.log'),
          maxLogSize: 1024 * 1024 * 5,
          backups: 3,
        },
        infoLog: {
          type: 'file',
          filename: path.join(__dirname, './services/infoLog.log'),
          maxLogSize: 1024 * 1024 * 5,
        }
      },
      categories: {
        default: { appenders: ['console'], level: 'debug' },
        log: { appenders: ['console'], level: 'debug' },
        error: { appenders: ['errorLog'], level: 'error' },
        info: { appenders: ['infoLog'], level: 'info' }
      }
    })

    LEVELS.forEach((level) => {
      const logger = level === 'default' ? log4js.getLogger() : log4js.getLogger(level)
      Object.defineProperty(this.logs, level, {
        value: logger,
        writable: true
      })
    })
  }
}

module.exports = new MakeLog()['logs']