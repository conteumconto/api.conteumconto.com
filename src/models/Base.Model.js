'use strict'
import mongoose from 'mongoose'
/*
	Base model Operations
*/
export default class BaseModel {
	/*
		The constructor recives
		@model => mongoose Schema
		@key   => string of index key on mongooseSchema
		@data  => transitional data object {
			the purpose of this attribute its to be a two way data bind between the requisition object
			that we could store in mongodb and result of query in data stored on mongoDB
		}
	*/
	constructor (Model, key, data) {
		mongoose.Promise = Promise
		this.Model = Model
		this.key = key
		this.data = data
	}

	/*
		Basics crud -> ID bases
	*/

	/*
		All the methods working in the same way ->
			return a promise from the action that we try
			to make
	*/
	/*
		eg: persist()
			this.data  === req.body -> object that we want to store
			this.Model === StudentSchema, BookSchema, anyStuffSchema ...

			so we return a promise to who calls the persist method and who
			calls(that is who that actually intend to save data)
			must have to resolve this `create` promise

	*/
	persist () {
		let modelObj = new this.Model(this.data)
		return this.Model.create(modelObj)
	}

	getById () {
		return this.Model.find({_id: this.data._id}).exec()
	}

	updateById () {
		return this.Model.findByIdAndUpdate(this.data._id, this.data)
	}

	/*
		this its return the number of rows afecteds by the data update,
		not the updated objects
	*/
	deleteById () {
		return this.Model.findByIdAndRemove(this.data._id)
	}

	/*
		advanced API -> Simple query on modelObjects coverage
	*/
	getByField () {
		return this.Model.find(this.data).exec()
	}

	deleteByField (query) {
		return this.Model.findOneAndRemove(query).exec()
	}

	updateByField (query) {
		return this.Model.update(query, this.data)
	}
}
