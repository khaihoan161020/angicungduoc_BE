'use strict'

import { Schema, model } from 'mongoose' // Erase if already required

const DOCUMENT_NAME = 'ApiKey'
const COLECTION_NAME = 'ApiKeys'
// Declare the Schema of the Mongo model
const apiKeySchema = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: Boolean,
            default: true
        },
        permissions: {
            type: [String],
            require: true,
            enum: ['0000', '0001', '0002']
        }
    },
    {
        timestamps: true,
        collection: COLECTION_NAME
    }
)

//Export the model
export default model(DOCUMENT_NAME, apiKeySchema)
