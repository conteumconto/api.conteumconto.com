'use strict'
import mongoose from 'mongoose'
import config from '../config/database'

export default class Database {

  static init () {
    mongoose.Promise = global.Promise
    return process.env.DEV ? this._local(): this._production();
  }

  static _production () {
    console.log(process.env.MONGODB_URI)
    let connection
    return connection = mongoose.createConnection(process.env.MONGODB_URI, {
      useMongoClient: true,
    }).then(() => {
        console.log('Database connected successfully')
      }).catch((err) => {
        console.error(err)
      })
  }

  static _local () {
    let connection
    const localURI = 'mongodb://' + config.dev.local.host + ':' + 
                      config.dev.local.port + '/' +config.dev.local.database
                      
    return connection = mongoose.createConnection(localURI, {
      useMongoClient: true,
    }).then(() => {
        return true
      }).catch((err) => {
        console.error(err)
      })
  }

}