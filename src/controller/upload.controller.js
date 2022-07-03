const logger = require('@src/utils/log4');


class UploadController {
  async createTableByExcel (ctx, next) {
    console.log(ctx.tableName);
    console.log(ctx.seqConfig);
  }
}

module.exports = new UploadController()
