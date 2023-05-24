'use strict'

import { CREATED, SuccessResponse } from '~/core/success.response'
import { MiddlewareFn } from '~/interface/middleware'
import AccessService from '~/services/access.service'

class AccessController {
    handleRefreshToken: MiddlewareFn = async (req, res, next) =>
        new SuccessResponse({
            message: 'Refresh success',
            metadata: await AccessService.handleRefreshToken(req.body.refreshToken)
        }).send(res)

    signUp: MiddlewareFn = async (req, res, next) =>
        new CREATED({
            message: 'Register',
            metadata: await AccessService.signUp(req.body)
        }).send(res)

    login: MiddlewareFn = async (req, res, next) =>
        new SuccessResponse({
            message: 'Login',
            metadata: await AccessService.login(req.body)
        }).send(res)

    logout: MiddlewareFn = async (req, res, next) =>
        new SuccessResponse({
            message: 'Logout Success',
            metadata: await AccessService.logout(req.body.keyStore)
        }).send(res)
}

export default new AccessController()
