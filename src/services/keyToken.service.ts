'use strict'

import { TokenPair } from '~/interface/auth'
import keyTokenModel from '~/models/keyToken.model'
interface CreateKeyToken {
    userId: any
    publicKey: string
    privateKey: string
    refreshToken: string
}
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }: CreateKeyToken) => {
        try {
            const filter = { userId: userId }
            const update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken }
            const options = { upsert: true, new: true }
            console.log('run >>>')
            const token = await keyTokenModel.findOneAndUpdate(filter, update, options)
            console.log('create token::::>>>>>>>>>>>>>>>>>>', { token })
            return token ? token.publicKey : null
        } catch (error) {
            return error
        }
    }
}

export default KeyTokenService
