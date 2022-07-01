const xlsx = require('node-xlsx');
const logger = require('@src/utils/log4');
const $consts = require('@src/constants');
const { checkSheetName } = require('@src/utils/tools');
const { errorEmitter, clearFile } = require('@src/utils/common')

class UploadMiddleware {
  async uploadExcel (ctx, next) {
    try {
      // 指定file字段, 前端必须以file为字段名请求
      const file = ctx.request.files.file;
      // 一次只允许上传一份excel
      if (!file?.length) {
        const ext = file.originalFilename.split('.').pop()
        // 是否是excel文件
        if (ext !== 'xlsx' || ext !== 'xls') {

          return errorEmitter(ctx, $consts['ERROR/FILE_TYPE_ERROR'])
        }
        const filePath = file.filepath.split('\\').join('/')
        const sheetDataList = xlsx.parse(filePath);
        sheetDataList?.forEach(sheetData => {
          const sheetNameIsCorrect = checkSheetName(sheetData.name)
          // sheet名不允许有中文且不允许数字开头
          if (!sheetNameIsCorrect) return errorEmitter(ctx, $consts['ERROR/SHEET_NAME_IS_WRONG'])
          // TODO
        })
      } else {
        return errorEmitter(ctx, $consts['ERROR/MAX_FILE_COUNT'])
      }
    } catch (error) {
      logger.error('UploadMiddleware_uploadExcel_', error)
    }
  }
}


module.exports = new UploadMiddleware()