/**
 * @namespace Model
 * @property {module:BaseModel} BaseModel
 */
/**
 * @module BaseModel
 */
'use strict'
/**
 * Mongoose Module
 * @const
*/
import mongoose from 'mongoose'

export default class BaseModel {
	/**
	 * Models Common Object.
	 * Models Objects could extends this Abstract Object Models
	 * (\Models\BaseModel) wich means that Models Object will must be interact 
	 * with some Mongoose Object Scheme, so, this Abstract Object Models handles with basics CRUD 
	 * Models methods aside Mongoose Object Scheme for us.
	 * Specific Model Operations shouldnt be implemented here.
	 * @constructor
	*/
	constructor (Scheme, key, data) {
		/**
		 * @property {object} Scheme - Scheme Object(eg.: \models\schemes\Student\).
		 * @property {string} key - identifier field of this Scheme.
		 * @property {string} data - two way data bind between the requisition object that we could store in mongodb and result of query in data stored on mongoDB
		*/
		mongoose.Promise = Promise
		this.Scheme = Scheme
		this.key = key
		this.data = data
	}
	/**
	 * Generic Persist Method.
	 * Store the data property
	 * When the promise is resolved this method retrieves the Object stored in MongoDB
	 * @name Persist
	 * @method persist
	 * @return {object} Return a promisse to who intent to save data.
	*/
	persist () {
		let modelObj = new this.Scheme(this.data)
		return this.Scheme.create(modelObj)
	}
	/**
	 * Generic GetById Method.
	 * Query this.Schema by identifier field
	 * When the promise is resolved this method retrieves the Object stored in MongoDB
	 *
	 * @name GetById
	 * @method getById
	 * @return {object} Return a promise to who intend to retrieves data.
	*/
	getById () {
		return this.Scheme.find({_id: this.data._id}).exec()
	}
	/**
	 * Generic UpdateById Method.
	 * Query this.Schema by identifier field
	 * When this promise is resolved this method retrieves the Object update in MongoDB
	 *
	 * @name UpdateById
	 * @method updateById
	 * @return {object} Return a promisse to who intend to update data.
	*/
	updateById () {
		return this.Scheme.findByIdAndUpdate(this.data._id, this.data)
	}

	/**
	 * Generic DeleteById Method.
	 * Query this.Schema by identifier field
	 * When the promisse its resolved this method retrives a number of rows afected by
	 * findAndRemove action. Must be one because ID its unique
	 *
	 * @name DeleteById
	 * @method deleteById
	 * @return {object} Return a promisse to who intend to delete data.
	*/
	deleteById () {
		return this.Scheme.findByIdAndRemove(this.data._id)
	}

	/*
		advanced API -> Simple query on modelObjects coverage
	*/
	/**
	 * Generic GetByField Method.
	 * Query this.Schema by Data Object
	 * When the promisse is resolved this method retrieves the Object stored in MongoDB
	 *
	 * @name GetByField
	 * @method getByField
	 * @return {object} Return a promisse to who intend to retrives data.
	*/
	getByField () {
		return this.Scheme.find(this.data).exec()
	}
	/**
	 * Generic DeleteByField Method.
	 * Query this.Schema by query parameter
	 * When the promisse its resolved this method retrives a number of rows afected by
	 * findAndRemove action. Must be one because ID its unique
	 * @name DeleteByField
	 * @method deleteByField
	 * @param {object} query - mongoose query object.
	 * @return {object} Return a promisse to who intend to delete data.
	*/
	deleteByField (query) {
		return this.Scheme.findOneAndRemove(query).exec()
	}
	/**
	 * Generic UpdateByField Method.
	 * Query this.Schema by query parameter
	 * When this promise is resolved this method retrieves the Object update in MongoDB
	 * findAndRemove action. Must be one because ID its unique
	 * @name UpdateByField
	 * @method updateByField
	 * @param {object} query - mongoose query object.
	 * @return {object} Return a promisse to who intend to update data.
	*/
	updateByField (query) {
		return this.Scheme.update(query, this.data)
	}
}
