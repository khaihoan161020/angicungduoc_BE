'use strict'

import { StatusCodes, ReasonPhrases } from 'src/constants/httpCodes'
import { ResponseInterface } from '~/interface/response'
class SuccessResponse {
    message: string
    statusCode: number
    metadata: any
    constructor({ message, statusCode, reasonStatusCode = ReasonPhrases.OK, metadata = {} }: ResponseInterface) {
        this.message = message ? message : reasonStatusCode
        this.statusCode = statusCode ? statusCode : StatusCodes.OK
        this.metadata = metadata
    }

    send(res: any, headers = {}) {
        return res.status(this.statusCode).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK,
        reasonStatusCode = ReasonPhrases.OK,
        metadata
    }: ResponseInterface) {
        super({ message, statusCode, reasonStatusCode, metadata })
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.CREATED,
        reasonStatusCode = ReasonPhrases.CREATED,
        metadata
    }: ResponseInterface) {
        super({ message, statusCode, reasonStatusCode, metadata })
    }
}

export { OK, CREATED, SuccessResponse }
