/**
 * @namespace Database
 * @property {module:Database} Database
 */
/**
 * Database handle with mongodb connections.
 * @module Database
 */
'use strict'
/**
 * mongoose Module
 * @const
 */
import mongoose from 'mongoose'
/**
 * Config Database Module
 * @const
 */
import config from '../config/database'
export default class Database {
	/**
	 * Init method.
	 * Starts new Connection with MongoDB.
	 * If the process.env.DEV === True this method will try to connect with your local
	 * database. Change the connection constans in Config Database Module
	 *
	 * @name Init
	 * @return {object} MongoDB Connection.
	 * @method init
	 */
	init () {
		mongoose.Promise = global.Promise
		return process.env.DEV === 'True' ? this._local() : this._production()
	}
	/**
	 * _production Connection method.
	 * Make a connection with Heroku MLabs that is production Database.
	 *
	 * @name _production
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {object} MLab:Heroku Connection.
	 * @method _production
	 * @private
	 * @todo Use process.env.MONGODB_URI instead hardcoded connection string
	 * @todo Write comments
	 */
	_production () {
		return mongoose.connect('mongodb://heroku_dq9b7270:qt9jrol5hbeqj6gc3chksbau6q@ds227555.mlab.com:27555/heroku_dq9b7270').then(() => {
			console.log('[Prod] -> Database conected')
			return true
		}).catch((err) => {
			console.error(err)
		})
	}
	/**
	 * _local Connection method.
	 * Make a connection with localhost MongoDB test Database.
	 * Change the connection constants in Config Database Module(\Config\DatabaseConfig).
	 *
	 * @name _local
	 * @return {object} MongoDB:Local Connection.
	 * @method _local
	 * @private
	 */
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
