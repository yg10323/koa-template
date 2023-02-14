## koa服务模板 TS && JS
[如果觉得不错, 请点我前往github点一个星星支持一下~](https://github.com/yg10323/koa-template)

### create-koa2
提供 [create-koa2](https://www.npmjs.com/package/create-koa2) 拉取项目模板
```js
// 全局安装
npm install create-koa2 -g

// 创建ts项目模板
create-koa2 koa2-project

// 创建js项目模板
create-koa2 koa2-project --template javascript
```

### 1. 启动
根目录下执行:
```js
yarn

yarn start
```
启动成功测试: 浏览器地址栏输入: http://localhost:4012/api/test, 返回如下则成功
```js
{
  "IsSuccessfull": true,
  "Data": "This is a Get request",
  "Status": 200,
  "Total": 0,
  "PageIndex": 1,
  "PageSize": 0
}
```


### 2. 数据库相关
```js
在 src/plugins/consts/service/config.ts 中配置数据库信息
```
- ORM使用 sequelize
- 使用 SequelizeAuto 逆向生成 sequelize models
- **注: model 的名称均统一处理为: 首字母大写的数据表表名**

**如何使用**

- 在 src 目录下新建 server 目录
- server目录下新建文件比如: test.server.ts
- 导入models: import models from 'src/models'
- 比如数据库中有一张名为 user 的数据表, 要查询该表中的所有内容,可以写为:
  ```js
  import models from 'src/models'

  // model 名称为首字母大写的表名 user -> User
  export const getUser = async () => await models.User.findAll()
  ```
- 那么, 在其他需要用到该方法的地方, 即可类似如下: 
  ```js
  import Router from 'koa-router'
  import type { Context, Next } from 'src/types'
  import { getUser } from 'src/server/test.server'

  const testRouter = new Router({ prefix: '/api/test' })

  testRouter.get('/', async (ctx: Context, next: Next) => {
    const res = await getUser()

    ctx.body = {
      IsSuccessfull: true,
      Data: res,
      Status: 200,
      Total: 0,
      PageIndex: 1,
      PageSize: 0
    }
  })

  export default testRouter
  ```


### 3. 路由相关
```js
1. 路由文件统一放置在 src/routes 下, 且务必统一使用 export default 的方式导出
2. 该目录下的 index.ts 文件会统一进行路由注册
```


### 4. 使用ESM规范导入导出
模板的models、router、plugins等均采用动态注册的方式, 因此都建议使用ESM的规范进行导入导出
```js
import / export
```


### 5. 日志
```js
日志文件保存在 src/plugins/log目录下
```

### 6. 异常处理
在 **src/utils/error.ts** 中封装了异常处理的方法, 使用如下:
```js
import { emitError } from 'src/utils/error'

if(未携带token) {
  // 第二个参数会在 errorHandler 方法中进行匹配, 并返回对应的信息, 具体见方法具体逻辑
  return emitError(ctx, $consts['ERROR/UNAUTHORIZATION'])
}

```

### 7. 整体结构
```js
1. 配置文件为 src/plugins/consts/service/config.ts (数据库配置、服务端口配置、静态资源配置等)
2. 常量统一在 src/plugins/consts 目录下, 使用方式: $consts[大写文件名/配置的name]
3. 静态资源服务使用 koa-static, 统一放置在 static 目录下
4. 其他目录规范化: 比如中间件统一放置在 middleware 目录下, SQL操作放置在 server 目录下等
5. 已在 tsconfig.json 中配置 baseUrl 为 src
6. 包管理工具使用yarn
```

### 8. JS模板
整体相同, 但有略微差异