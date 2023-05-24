'use strict'

import { Schema, model } from 'mongoose' // Erase if already required

const DOCUMENT_NAME = 'Image'
const COLECTION_NAME = 'Images'
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        postId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Post'
        },
        url: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        collection: COLECTION_NAME
    }
)

//Export the model
export default model(DOCUMENT_NAME, keyTokenSchema)
