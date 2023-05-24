'use strict'

import express from 'express'
import access from './access'
import category from './category'
import upload from './upload'
import post from './post'
import { apiKey, permission } from '../auth/checkAuth'
const router = express.Router()

// middleware
router.use(apiKey)
// router.use(permission('0000'))

// other routes
router.use('/v1/api/auth', access)
router.use('/v1/api/category', category)
router.use('/v1/api/post', post)
router.use('/v1/api/upload', upload)
// router.use('/v1/api/product', require('./product') )

// catch 404

router.use((req, res, next) => {
    const error: any = new Error('Not Found')
    console.log('runnn')
    error.status = 404
    next(error)
})
//
router.use((error: any, req: any, res: any, next: any) => {
    const statusCode = error.status || 500

    return res.status(statusCode).json({
        status: 'Error',
        code: statusCode,
        message: error.message || 'Internal server'
    })
})
module.exports = router
