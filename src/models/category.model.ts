'use strict'

import { Schema, model } from 'mongoose' /// Erase if already required
const DOCUMENT_NAME = 'Category'
const COLECTION_NAME = 'Categories'
// Declare the Schema of the Mongo model
const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 150
        },
        icon: {
            type: String,
            require: true
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'ACTIVE'
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true,
        collection: COLECTION_NAME
    }
)

//Export the model
export default model(DOCUMENT_NAME, categorySchema)
