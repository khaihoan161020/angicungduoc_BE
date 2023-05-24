'use strict'

import express from 'express'
import { authentication } from '~/auth/authUtils'
import postController from '~/controllers/post.controller'
import asyncHandler from '~/helpers/asyncHandler'

const router = express.Router()

// authentication
router.get('/', asyncHandler(postController.get))
router.get('/detail/:postId', asyncHandler(postController.getDetail))
router.use(authentication)
router.post('/', asyncHandler(postController.create))
// router.patch('/:id', asyncHandler(categoryController.update))
// router.delete('/:id', asyncHandler(categoryController.delete))

export default router
