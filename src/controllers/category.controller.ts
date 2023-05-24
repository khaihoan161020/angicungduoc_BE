'use strict'

import { CREATED, SuccessResponse } from '~/core/success.response'
import { MiddlewareFn } from '~/interface/middleware'
import CategoryService from '~/services/category.service'

class AccessController {
    create: MiddlewareFn = async (req, res, next) =>
        new CREATED({
            message: 'Create success',
            metadata: await CategoryService.create(req)
        }).send(res)
    get: MiddlewareFn = async (req, res, next) =>
        new SuccessResponse({
            message: 'Success',
            metadata: await CategoryService.get()
        }).send(res)
    update: MiddlewareFn = async (req, res, next) =>
        new SuccessResponse({
            message: 'Update success',
            metadata: await CategoryService.update(req.params.id, req.body)
        }).send(res)
    delete: MiddlewareFn = async (req, res, next) =>
        new SuccessResponse({
            message: 'Delete success',
            metadata: await CategoryService.delete(req.params.id)
        }).send(res)
}

export default new AccessController()
