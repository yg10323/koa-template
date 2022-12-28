const config = [
  // koa 服务端口号
  {
    name: 'PORT',
    value: 4012
  },
  // 数据库类型
  {
    name: 'DIALECT',
    value: 'mysql',
  },
  // 数据库连接 域名
  {
    name: 'DB_HOST',
    value: 'localhost'
  },
  // 端口
  {
    name: 'DB_PORT',
    value: 3306
  },
  // 数据库名称
  {
    name: 'DB_DATABASE',
    value: ''
  },
  // 数据库 用户名
  {
    name: 'DB_USER',
    value: ''
  },
  // 数据库 密码
  {
    name: 'DB_PASSWORD',
    value: ''
  },
  {
    name: 'HOST_PREFIX',
    value: 'http://'
  },
  {
    name: 'SERVER_HOST',
    value: 'localhost'
  },
  {
    name: 'API_PREFIX',
    value: '/api'
  },
  // sequelize models 保存路径
  {
    name: 'MODEL_DIRECTORY',
    value: 'src/models'
  },
  // models 语言
  {
    name: 'MODEL_LANGUAGE',
    value: 'ts'
  }
]

export default config