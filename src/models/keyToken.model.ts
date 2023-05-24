'use strict'

import { Schema, model } from 'mongoose' // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        publicKey: {
            type: String,
            required: true
        },
        privateKey: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            reqired: true
        },
        refreshTokensUsed: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        collection: COLECTION_NAME
    }
)

//Export the model
export default model(DOCUMENT_NAME, keyTokenSchema)
