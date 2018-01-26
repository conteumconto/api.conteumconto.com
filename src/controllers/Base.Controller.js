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
	 * Responds to POST /{GenericResource}.
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
		new this.Model(req.body).persist()
			.then(data => {
				if (data) res.status(200).json(data).end()
				else throw new Error('object_not_saved')
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'object_not_saved') res.status(400).json(err.message).end()
				else res.status(500).json(err.message).end()
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
		new this.Model({_id: req.params.id}).getById()
			.then(data => {
				if (data.length !== 0) {
					data = data[0]
					res.status(200).json(data).end()
				} else throw new Error('object_not_found')
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'object_not_found') res.status(400).json(err.message).end()
				else res.status(500).json(err.message).end()
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
		new this.Model(req.body).updateById()
			.then(data => {
				if (data) {
					if (data.password) {
						data = data.toObject()
						delete data['password']
					}
					res.status(200).json(data).end()
				} else throw new Error('object_not_updated')
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'object_not_updated') res.status(400).json(err.message).end()
				else res.status(500).json(err.message).end()
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
		const data = {
			_id: req.params.id
		}

		new this.Model(data).deleteById()
			.then(response => {
				if (response) res.status(200).json(response).end()
				else throw new Error('object_not_deleted')
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'object_not_deleted') res.status(400).json(err.message).end()
				else res.status(500).json(err.message).end()
			})
	}

	/**
	 * Remove list of model IDs
	 * @name RemoveByIdList
	 * @param {Array} list
	 * @return {json} status and deleted number of rows as result.
	 * @method removeByIdList
	 */
	removeByIdList (list) {
		return new this.Model().removeByIdList({
			'_id': { $in: list }
		})
	}
}
