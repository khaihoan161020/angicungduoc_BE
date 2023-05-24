'use strict'
import { StatusCodes, ReasonPhrases } from '~/constants/httpCodes'
import { ResponseInterface } from '~/interface/response'
class ErrorResponse extends Error {
    status: number
    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor({ message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT }: ResponseInterface) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor({ message = ReasonPhrases.BAD_REQUEST, statusCode = StatusCodes.BAD_REQUEST }: ResponseInterface) {
        super(message, statusCode)
    }
}

class ForbidenRequestError extends ErrorResponse {
    constructor({ message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN }: ResponseInterface) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
    constructor({ message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED }: ResponseInterface) {
        super(message, statusCode)
    }
}

class NotFoundError extends ErrorResponse {
    constructor({ message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND }: ResponseInterface) {
        super(message, statusCode)
    }
}

export { ConflictRequestError, BadRequestError, AuthFailureError, NotFoundError, ForbidenRequestError }
