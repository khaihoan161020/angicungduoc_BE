export interface ConfigType {
    app: {
        port: string | undefined
    }
    db: {
        host: string | undefined
        port: string | undefined
        name: string | undefined
    }
}

const dev: ConfigType = {
    app: {
        port: process.env.DEV_APP_PORT
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME
    }
}

const product: ConfigType = {
    app: {
        port: process.env.DEV_APP_PORT
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME
    }
}

const config: any = { dev, product }
const env = process.env.NODE_ENV || 'dev'
const environment = config[env]
export default environment
