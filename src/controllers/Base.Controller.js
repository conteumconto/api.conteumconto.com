/**
 * @namespace Controller
 * @property {module:BaseController} BaseController
 */
/**
 * @module BaseController
 */
'use strict'
export default class BaseController {
	/**
	 * Controllers Common Object.
	 * Controller Objects could extends this Abstract Object Controller
	 * (\Controllers\BaseController) wich means that Controller Object will must be interact
	 * with some Object Model, so, this Abstract Object Controller handles with basics CRUD
	 * Controller methods aside Model Objects for us.
 	 * Specific Controller operation shouldnt be implemented here.
	 * @constructor
	 * @param {object} Model - Model Object(eg.: \models\StudentModel\).
	*/
	constructor (Model) {
		/**
		 * This property its contains the Model Methods(eg.: Model().persist() -> save data on mongodb)
		 * @property {object} Model - Database Collection Object (eg.: \models\StudentModel\)
		*/
		this.Model = Model
	}

	/**
	 * Generic Save Method.
	 * Responds to POST /{GenericResource}/.
	 * If Success returns 200 status code and a json with this.Model saved data.
	 * If error return 400 status code and a json => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 *
	 * @name Save
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method save
	 * @todo Write comments
	*/
	save (req, res) {
		let modelPromise = new this.Model(req.body).persist()

		Promise.all([
			modelPromise
		]).then((data) => {
			if (data) {
				res.send(data[0])
				res.status(201)
				res.end()
			}
		}).catch(err => {
			res.json(err)
			res.status(400)
			res.end()
		})
	}
	/**
	 * Generic GetById Method.
	 * Responds to GET /{GenericResource}/.
	 * Simple query this.Model by id.
	 * If Success returns 200 status code and a json with this.Model data.
	 * If error return 400 status code and a json => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 *
	 * @name GetById
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method getById
	 * @todo Write comments
	*/
	getById (req, res) {
		let modelPromise = new
			this.Model({
				_id: req.params.id
			}).getById()

		Promise.all([
			modelPromise
		]).then((data) => {
			if (data) {
				res.send(data[0][0])
				res.status(200)
				res.end()
			}
		}).catch(err => {
			console.log(err)
		})
	}
	/**
	 * Generic UpdateById Method.
	 * Responds to PUT /{GenericResource}/.
	 * Simple update this.Model by id.
	 * If Success returns 200 status code and a json with this.Model modified data.
	 * If error return 400 status code and a json => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 *
	 * @name UpdateById
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method updateById
	 * @todo Write comments
	*/
	updateById (req, res) {
		let modelPromise = new this.Model(req.body).updateById()

		Promise.all([
			modelPromise
		]).then((data) => {
			if (data) {
				res.send(data[0])
				res.status(200)
				res.end()
			}
		}).catch(err => {
			res.json(err)
			res.status(400)
			res.end()
		})
	}
	/**
	 * Generic RemoveById Method.
	 * Responds to DELETE /{GenericResource}/.
	 * Simple delete this.Model by id.
	 * If Success returns 200 status code and a json with this.Model number of rows affected.
	 * If error return 400 status code and a json => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 *
	 * @name RemoveById
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method removeById
	 * @todo Write comments
	*/
	removeById (req, res) {
		let data = {
			_id: req.params.id
		}

		let modelPromise = new this.Model(data).deleteById()

		Promise.all([
			modelPromise
		]).then((data) => {
			if (data) {
				res.send(data[0])
				res.status(200)
				res.end()
			}
		}).catch(err => {
			res.json(err)
			res.status(400)
			res.end()
		})
	}
}
