'use strict'
import mongoose from 'mongoose'
import config from '../config/database'

export default class Database {
	static init () {
		mongoose.Promise = global.Promise
		return process.env.DEV ? this._local() : this._production()
	}

	static _production () {
		console.log('mongodb://heroku_z1rp5mnh:9idkpr8q4q5ef78nifns2p1259@ds117615.mlab.com:17615/heroku_z1rp5mnh')
		return mongoose.createConnection('mongodb://heroku_z1rp5mnh:9idkpr8q4q5ef78nifns2p1259@ds117615.mlab.com:17615/heroku_z1rp5mnh', {
			useMongoClient: true
		}).then(() => {
			console.log('Database connected successfully')
		}).catch((err) => {
			console.error(err)
		})
	}

	static _local () {
		const localURI = 'mongodb://' + config.dev.local.host + ':' +
											config.dev.local.port + '/' + config.dev.local.database

		return mongoose.createConnection(localURI, {
			useMongoClient: true
		}).then(() => {
			return true
		}).catch((err) => {
			console.error(err)
		})
	}
}
