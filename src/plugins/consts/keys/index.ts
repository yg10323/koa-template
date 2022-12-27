import fs from 'fs'
import path from 'path'

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, 'private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, 'public.key'))

export const RSAKEYS = {
  PRIVATE_KEY,
  PUBLIC_KEY
}