'use strict'
import lodash from 'lodash'

const getIntoData = (fields: Array<string> = [], object: any = {}) => {
    return lodash.pick(object, fields)
}

export { getIntoData }
