'use strict'
import mongoose from 'mongoose'
import config from '../config/database'

export default class Database {
	init () {
		mongoose.Promise = global.Promise
		return process.env.DEV ? this._local() : this._production()
	}

	_production () {
		return mongoose.connect(process.env.MONGO_URI).then(() => {
			console.log('Database connected successfully')
			return true
		}).catch((err) => {
			console.error(err)
		})
	}

	_local () {
		const localURI = 'mongodb://' + config.dev.local.host + ':' +
											config.dev.local.port + '/' + config.dev.local.database

		return mongoose.connect(localURI).then(() => {
			console.log('Database connected successfully')
			return true
		}).catch((err) => {
			console.error(err)
		})
	}
}
