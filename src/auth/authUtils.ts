'use strict'

import JWT, { JwtPayload } from 'jsonwebtoken'
import { AuthFailureError, NotFoundError } from '~/core/error.response'
import asyncHandler from '~/helpers/asyncHandler'
import { JWTDecodeInterface, TokenPair } from '~/interface/auth'
import KeyTokenRepo from '~/models/repositories/keyToken.repos'
import { HEADERS } from '~/constants/util'


const createTokenPair = async (payload: any, publicKey: string, privateKey: string): Promise<TokenPair> => {
    try {
        // accessToken
        const accessToken = JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })
        const refreshToken = JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const authentication = asyncHandler(async (req: any, res: any, next: any) => {
    /*
    1 - check UserID
    2 - get accessToken
    3 - verify Token
    4 - checkuser in db
    5 - check keyStore with this userID
    6 - ok => return next()
    */

    // 1
    const userID = req.headers[HEADERS.CLIENT_ID]
    if (!userID) throw new AuthFailureError({ message: 'Invalid request' })

    // 2

    const keyStore = await KeyTokenRepo.findUserIdByUserId(userID)

    if (!keyStore) throw new NotFoundError({ message: 'Not Found Key Store' })

    // 3
    const accessToken = req.headers[HEADERS.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError({ message: 'Invalid request' })

    const decodeUser: any = JWT.verify(accessToken, keyStore.publicKey)
    if (userID !== decodeUser.userID) throw new AuthFailureError({ message: 'Invalid User' })

    req.keyStore = keyStore
    req.user = decodeUser
    return next()
})

const verifyJWT = (token: string, keySecret: string): any => {
    return JWT.verify(token, keySecret)
}
export { createTokenPair, authentication, verifyJWT }
