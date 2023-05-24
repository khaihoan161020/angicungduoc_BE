'use strict'
import { BadRequestError } from '~/core/error.response'
import cateogoryModel from '~/models/category.model'
import { HEADERS } from '~/constants/util'
import postModel from '~/models/post.model'
import imageModel from '~/models/image.model'
import mongoose from 'mongoose'
import slugify from 'slugify'

class PostService {
    static create = async (req: any) => {
        const { name, description, openTime, closeTime, addressList, selectedCategory, selectedImages, tiktokLinks } =
            req.body

        const post = await postModel.create({
            userId: req.headers[HEADERS.CLIENT_ID],
            title: name,
            title_slug: slugify(name),
            description: description,
            openTime,
            closeTime,
            address: addressList,
            categories: selectedCategory.map((e: any) => e._id),
            tiktokLinks,
            count_image: selectedImages.length
        })

        await imageModel.insertMany(
            selectedImages.map((img: string) => ({
                postId: post._id,
                userId: req.headers[HEADERS.CLIENT_ID],
                url: img
            }))
        )
        return post
        // const post = await postModel.create({
        //     userId: req.headers[HEADERS.CLIENT_ID],
        //     ...req.body
        // })
        // return { post }
    }

    static get = async () => {
        // const post = await postModel.find()

        const lookUpUser = [
            {
                $lookup: {
                    from: 'Users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: { path: '$user', preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    'user.status': 0,
                    'user.verify': 0,
                    'user.roles': 0,
                    'user.password': 0
                }
            }
        ]
        const post = await postModel.aggregate([
            {
                $lookup: {
                    from: 'Categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categories'
                }
            },
            {
                $project: { 'categories.status': 0 }
            },
            {
                $lookup: {
                    from: 'Images',
                    localField: '_id',
                    foreignField: 'postId',
                    // pipeline: [...lookUpUser],
                    pipeline: [
                        {
                            $limit: 1
                        }
                    ],
                    as: 'image'
                }
            },
            {
                $unwind: { path: '$image', preserveNullAndEmptyArrays: true }
            },
            ...lookUpUser
        ])
        return {
            post
        }
    }

    static getDetail = async (postId: any) => {
        console.log({ postId })
        const lookUpUser = [
            {
                $lookup: {
                    from: 'Users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: { path: '$user', preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    'user.status': 0,
                    'user.verify': 0,
                    'user.roles': 0,
                    'user.password': 0
                }
            }
        ]
        const post = await postModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(postId)
                }
            },
            {
                $lookup: {
                    from: 'Categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categories'
                }
            },
            {
                $project: { 'categories.status': 0 }
            },
            {
                $lookup: {
                    from: 'Images',
                    localField: '_id',
                    foreignField: 'postId',
                    pipeline: [...lookUpUser],
                    as: 'image'
                }
            },
            {
                $unwind: { path: '$image', preserveNullAndEmptyArrays: true }
            },
            ...lookUpUser
        ])
        return post && post.length && post[0]
    }

    static update = async (id: string, payload: any) => {
        const holderCategory = await cateogoryModel.findById(id).lean()
        if (!holderCategory) {
            throw new BadRequestError({ message: 'Category not found' })
        }

        const categoryUpdate = await cateogoryModel.findOneAndUpdate({ _id: id }, payload, {
            new: true
        })
        return { categoryUpdate }
    }

    static delete = async (id: string) => {
        const holderCategory = await cateogoryModel.findById(id).lean()
        if (!holderCategory) {
            throw new BadRequestError({ message: 'Category not found' })
        }
        const deleteCate = await cateogoryModel.deleteOne({ name: holderCategory.name }).lean()
        return deleteCate
    }
}

export default PostService
