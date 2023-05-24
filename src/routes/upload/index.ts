'use strict'

import express from 'express'
import { authentication } from '~/auth/authUtils'
import uploadController from '~/controllers/upload.controller'
import asyncHandler from '~/helpers/asyncHandler'
import multer from 'multer'
const router = express.Router()

// authentication
router.use(authentication)
router.post('/image', multer().single('file'), asyncHandler(uploadController.upload))

export default router
