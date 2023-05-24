'use strict'
import apiKeyModel from '~/models/apiKey.model'

class ApiKeyService {
    static findByID = async (key: string) => {
        const objKey = apiKeyModel.findOne({ key, status: true }).lean()

        return objKey
    }
}

export default ApiKeyService
