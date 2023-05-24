'use strict'

import express from 'express'
import { authentication } from '~/auth/authUtils'
import categoryController from '~/controllers/category.controller'
import asyncHandler from '~/helpers/asyncHandler'

const router = express.Router()

// authentication
router.get('/', asyncHandler(categoryController.get))
router.use(authentication)
router.post('/', asyncHandler(categoryController.create))
router.patch('/:id', asyncHandler(categoryController.update))
router.delete('/:id', asyncHandler(categoryController.delete))

export default router
