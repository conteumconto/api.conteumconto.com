'use strict'
import mongoose from 'mongoose'
import config from '../config/database'

export default class Database {

  static init () {
    mongoose.Promise = global.Promise
    return process.env.DEV ? this._local(): this._production();
  }

  static _production () {
    let connection
    return connection = mongoose.connect(process.env.MONGODB_URI)
      .then(() => {
        console.log('Database connected successfully')
      }).catch((err) => {
        console.error(err)
      })
  }

  static _local () {
    console.log('hellor')
    let connection
    const localURI = 'mongodb://' + config.dev.local.host + ':' + 
                      config.dev.local.port + '/' +config.dev.local.database
                      
    return connection = mongoose.connect(localURI)
      .then(() => {
        return true
      }).catch((err) => {
        console.error(err)
      })
  }

}