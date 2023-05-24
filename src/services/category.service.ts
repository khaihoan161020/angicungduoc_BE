'use strict'
import { BadRequestError } from '~/core/error.response'
import cateogoryModel from '~/models/category.model'
import { HEADERS } from '~/constants/util'
import { getIntoData } from '~/utils'

class CategoryService {
    static create = async (req: any) => {
        const { name, icon } = req.body
        const holderCategory = await cateogoryModel.findOne({ name: name }).lean()

        if (holderCategory) {
            throw new BadRequestError({ message: 'This category already register' })
        }

        const category = await cateogoryModel.create({
            userId: req.headers[HEADERS.CLIENT_ID],
            name,
            icon
        })
        return { category }
    }

    static get = async () => {
        const categories = await cateogoryModel.find()
        const formatCategory = categories.map((cate) => getIntoData(['_id', 'name', 'icon'], cate))

        return {
            categories: formatCategory
        }
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

export default CategoryService
