import mongoose from 'mongoose'
import configDB from 'src/configs/config.mongodb'

const {
    db: { host, name, port }
} = configDB

const connectString = `mongodb://${host}:${port}/${name}`
class Database {
    constructor() {
        this.connect()
    }
    static instance: Database

    // connect
    connect(type = 'mongodb') {
        // eslint-disable-next-line no-constant-condition
        if (true) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
        mongoose
            .connect(connectString, {
                maxPoolSize: 50
            })
            .then((_) => {
                console.log('Connected MongoDB Success!!!')
                // const { countConnect } = require('../helpers/check.connect')
                // countConnect()
            })
            .catch((err) => console.log(`Error::${err}`))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        console.log('run db', connectString)
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb
