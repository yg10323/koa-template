const path = require('path')
const fs = require('fs')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, 'private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, 'public.key'))

module.exports = [
  {
    name: 'PRIVATE_KEY',
    value: PRIVATE_KEY
  },
  {
    name: 'PUBLIC_KEY',
    value: PUBLIC_KEY
  }
]

/**
 * openssl
 * genrsa -out private.key 1024
 * rsa -in private.key -pubout -out public.key
 */