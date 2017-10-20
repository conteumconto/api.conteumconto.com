'use strict'
import mongoose from 'mongoose'
import config from '../config/database'

export default class Database {
	init () {
		mongoose.Promise = global.Promise
		return process.env.DEV === 'True' ? this._local() : this._production()
	}

	_production () {
		return mongoose.connect('mongodb://heroku_z1rp5mnh:9idkpr8q4q5ef78nifns2p1259@ds117615.mlab.com:17615/heroku_z1rp5mnh').then(() => {
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
