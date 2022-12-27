import Koa from 'koa'

export type Context = Koa.Context
export type Next = () => Promise<any>