'use strict'

import { Schema, model } from 'mongoose' /// Erase if already required

const addresSchema = new Schema({
    city_name: {
        type: String,
        require: true
    },
    city_codename: {
        type: String,
        require: true
    },
    district_name: {
        type: String,
        require: true
    },
    district_codename: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    }
})

const DOCUMENT_NAME = 'Post'
const COLECTION_NAME = 'Posts'
// Declare the Schema of the Mongo model
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 150
        },
        title_slug: {
            type: String
        },
        categories: [
            {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Category'
            }
        ],
        address: {
            type: [addresSchema],
            default: []
        },
        openTime: {
            type: String,
            default: null
        },
        closeTime: {
            type: String,
            default: null
        },
        description: {
            type: String,
            maxLength: 300,
            default: null
        },
        count_image: {
            type: Number
        },
        linkTiktok: {
            type: Array<string>,
            default: []
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
        }
    },
    {
        timestamps: true,
        collection: COLECTION_NAME
    }
)

//Export the model
export default model(DOCUMENT_NAME, postSchema)
