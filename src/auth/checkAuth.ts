'use strict'
import { ForbidenRequestError } from '~/core/error.response'
import { MiddlewareExtendRequestFn } from '~/interface/middleware'
import ApiKeyService from '~/services/apiKey.service'

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}
const apiKey: MiddlewareExtendRequestFn = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()

        if (!key) {
            return res.status(403).json({
                message: 'Forbidden error'
            })
        }

        // check objectKey
        const objKey = await ApiKeyService.findByID(key)
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden error'
            })
        }

        req.objKey = objKey

        return next()
    } catch (error) {
        console.log(error)
    }
}

const permission = (permission: string): MiddlewareExtendRequestFn => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return new ForbidenRequestError({
                message: 'Forbidden error'
            })
        }
        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            return new ForbidenRequestError({
                message: 'Forbidden error'
            })
            // return res.status(403).json({
            //     message: 'Forbidden error'
            // })
        }

        return next()
    }
}

export { apiKey, permission }
