import keyTokenModel from '../keyToken.model'

class KeyTokenRepo {
    static findUserIdByUserId = async (userID: string) => {
        return await keyTokenModel.findOne({ userId: userID }).lean()
    }

    static findByUserID = async (userID: string) => {
        return await keyTokenModel.findOne({ user: userID }).lean()
    }

    static removeKeyByID = async (id: any) => {
        return await keyTokenModel.deleteOne(id)
    }

    static findByRefreshTokensUsed = async (rfToken: string) => {
        return await keyTokenModel.findOne({ refreshTokensUsed: { $in: [rfToken] } }).lean()
    }

    static findByRefreshToken = async (rfToken: string) => {
        return await keyTokenModel.findOne({ refreshToken: rfToken }).lean()
    }

    static deleteKeyByID = async (id: string) => {
        return await keyTokenModel.deleteOne({ userId: id })
    }

    static updateNewPairToken = async (id: any, oldRFToken: string, newRFToken: string) => {
        const filter = { _id: id }
        const update = {
            $set: { refreshToken: newRFToken },
            $addToSet: { refreshTokensUsed: oldRFToken }
        }
        return await keyTokenModel.findOneAndUpdate(filter, update)
    }

}
export default KeyTokenRepo
