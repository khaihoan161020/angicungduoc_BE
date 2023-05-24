'use strict'

import express from 'express'
import { authentication } from '~/auth/authUtils'
import accessController from '~/controllers/access.controller'
import asyncHandler from '~/helpers/asyncHandler'

const router = express.Router()

router.post('/signup', asyncHandler(accessController.signUp))
router.post('/login', asyncHandler(accessController.login))

// authentication
router.use(authentication)
router.post('/logout', asyncHandler(accessController.logout))
router.post('/refreshToken', asyncHandler(accessController.handleRefreshToken))

export default router
