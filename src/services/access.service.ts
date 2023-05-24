'use strict'
import userModel from '~/models/user.model'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import KeyTokenService from './keyToken.service'
import { createTokenPair, verifyJWT } from '~/auth/authUtils'
import { getIntoData } from '~/utils'
import { BadRequestError, ConflictRequestError, AuthFailureError } from '~/core/error.response'
import UserRepo from '~/models/repositories/user.repo'
import KeyTokenRepo from '~/models/repositories/keyToken.repos'
// import apiKeyModel from '~/models/apiKey.model'

const shopRoles = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}
class AccessService {
    static handleRefreshToken = async (refreshToken: string) => {
        const foundToken = await KeyTokenRepo.findByRefreshTokensUsed(refreshToken)

        if (foundToken) {
            // decode find userID
            const { userID, email } = verifyJWT(refreshToken, foundToken.privateKey)
            // delete
            await KeyTokenRepo.deleteKeyByID(userID)

            throw new BadRequestError({ message: 'Forbiden Error Token' })
        }
        const holderToken = await KeyTokenRepo.findByRefreshToken(refreshToken)

        if (!holderToken) throw new AuthFailureError({ message: 'Shop not register' })

        // verify
        const { userID, email } = verifyJWT(refreshToken, holderToken.privateKey)

        // check User
        const foundShop = await UserRepo.findUserByEmail({ email })
        if (!foundShop) throw new AuthFailureError({ message: 'Shop not register' })

        // create new token
        const tokens = await createTokenPair(
            {
                userID: foundShop._id,
                email
            },
            holderToken.publicKey,
            holderToken.privateKey
        )

        await KeyTokenRepo.updateNewPairToken(holderToken._id, refreshToken, tokens.refreshToken)

        return {
            user: { userID, email },
            tokens
        }
    }

    static logout = async (keyStoreId: string) => {
        return await KeyTokenRepo.removeKeyByID(keyStoreId)
    }

    /*
    1 - check email in DB
    2 - match password
    3 - create AT - RT and save
    4 - generate token
    5 - get data return login success
    */
    static login = async ({
        email,
        password,
        refreshToken = null
    }: {
        email: string
        password: string
        refreshToken: string | null
    }) => {
        const foundShop = await UserRepo.findUserByEmail({ email: email })
        // 1
        if (!foundShop) throw new BadRequestError({ message: 'Shop not register' })

        // 2
        const match = bcrypt.compare(password, foundShop.password)
        if (!match) throw new AuthFailureError({ message: 'Authentication error' })

        // 3
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        // 4
        const tokens = await createTokenPair(
            {
                userID: foundShop._id,
                email
            },
            publicKey,
            privateKey
        )

        const keyToken = await KeyTokenService.createKeyToken({
            userId: foundShop._id,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken
        })

        console.log('keyToken', keyToken)
        if (!keyToken) throw new BadRequestError({ message: 'Some thing error!' })
        // 5
        return {
            userInfo: getIntoData(['_id', 'name', 'email'], foundShop),
            tokens
        }
    }
    static signUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
        const holderShop = await userModel.findOne({ email }).lean()
        console.log('run service signup')
        if (holderShop) {
            throw new BadRequestError({ message: 'Error: Email already register' })
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await userModel.create({
            name,
            password: passwordHash,
            email,
            roles: [shopRoles['SHOP']]
        })

        if (newShop) {
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            // create tokenPair
            const tokens = await createTokenPair(
                {
                    userID: newShop._id,
                    email
                },
                publicKey,
                privateKey
            )

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
                refreshToken: tokens.refreshToken
            })

            if (!keyStore) {
                return {
                    code: 'xxx',
                    message: 'Error publicKey'
                }
            }

            // const newKey = await apiKeyModel.create({
            //     key: crypto.randomBytes(64).toString('hex'),
            //     permission: ['0000']
            // })

            return {
                userInfo: getIntoData(['_id', 'name', 'email'], newShop),
                tokens
            }
        }

        return {
            code: 200,
            metadata: null
        }
    }
}

export default AccessService
