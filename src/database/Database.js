'use strict'
import mongoose from 'mongoose'
import config from '../config/database'

export default class Database {
	init () {
		mongoose.Promise = global.Promise
		return process.env.MONGODB_URI ? this._production() : this._local()
	}

	_production () {
		return mongoose.connect(process.env.MONGODB_URI).then(() => {
			console.log('[Prod] -> Database conected')
			return true
		}).catch((err) => {
			console.error(err)
		})
	}

	_local () {
		const localURI = 'mongodb://' + config.dev.local.host + ':' +
											config.dev.local.port + '/' + config.dev.local.database

		return mongoose.connect(localURI).then(() => {
			console.log('[Dev] -> Database conected')
			return true
		}).catch((err) => {
			console.error(err)
		})
	}
}
