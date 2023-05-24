'use strict'

import { SuccessResponse } from '~/core/success.response'
import { MiddlewareFn } from '~/interface/middleware'
import UploadService from '~/services/upload.service'

class UploadController {
    upload: MiddlewareFn = async (req, res, next) =>
        new SuccessResponse({
            message: 'Success',
            metadata: await UploadService.upload(req)
        }).send(res)

}

export default new UploadController()
