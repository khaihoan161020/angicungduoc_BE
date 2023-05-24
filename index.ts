/* eslint-disable @typescript-eslint/no-var-requires */

import dotenv from 'dotenv'
import express, { Express } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()
const app: Express = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// init database
import('~/dbs/init.mongodb')
// router
app.use('/', require('~/routes'))
// handle error
// module.exports = app
const PORT = process.env.PORT || 3056
console.log('run server')

const server = app.listen(PORT, () => {
    console.log('eComerce start with port ', PORT)
})

// ctrl + C =>
process.on('SIGINT', () => {
    server.close(() => {
        console.log(`\nExit success`)
    })
})
