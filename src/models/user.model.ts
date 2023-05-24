'use strict'

import { Schema, model } from 'mongoose' /// Erase if already required
const DOCUMENT_NAME = 'User'
const COLECTION_NAME = 'Users'
// Declare the Schema of the Mongo model
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 150
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        avatar: {
            type: String
        },
        score: {
            type: Number,
            min: 0,
            default: 0
        },
        title: {
            type: String,
            require: true,
            default: 'New'
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'INACTIVE'
        },
        verify: {
            type: Schema.Types.Boolean,
            default: false
        },
        roles: {
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
export default model(DOCUMENT_NAME, userSchema)
