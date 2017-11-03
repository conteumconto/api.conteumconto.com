/**
 * @namespace Controller
 * @property {module:TeacherController} TeacherController
*/
/**
 * TeacherController handle with Teacher Resource Api.
 * Pass a Teacher Object Model(\Models\StudentModel) to the constructor
 * of class parent (\Controller\BaseController) for it map the basic database crud operations
 * to this Object.
 * @module TeacherController
 * @extends module:BaseController
*/
'use strict'
/**
 * Base.Controller Module
 * @const
*/
import BaseController from './Base.Controller.js'
/**
 * Teacher.Model Module
 * @const
*/
import TeacherModel from '../models/Teacher.Model'

export default class TeacherController extends BaseController {
	constructor () {
		super(TeacherModel)
	}
	/**
	 * TeacherByLogin method.
	 * Responds to GET /teacher/:login.
	 * If Success returns 200 status code and a json with teacher data.
	 * If error return 400 status code and a json => { errors }
	 * 500 status code only will be returned if the method generates some unexpected error
	 *
	 * @name StudentByLogin
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method teacherByLogin
	*/
	teacherByLogin (req, res) {
		let data = {
			login: req.params.login
		}

		let teacher = new TeacherModel(data).getByField()

		Promise.all([
			teacher
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
	 * UpdateByLogin method.
	 * Responds to PUT /teacher/:login.
	 * If Success returns 200 status code and a json with teacher data.
	 * If error return 400 status code and a json => { errors }
	 * 500 status code only will be returned if the method generates some unexpected error
	 *
	 * @name UpdateByLogin
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method updateByLogin
	*/
	updateByLogin (req, res) {
		let query = {
			login: req.params.login
		}

		let teacher = new TeacherModel(req.body).updateByField(query)

		Promise.all([
			teacher
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
	 * RemoveByLogin method.
	 * Responds to DELETE /teacher/:login.
	 * If Success returns 200 status code and a json with number of rows affected (one).
	 * If error return 400 status code and a json => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error
	 *
	 * @name RemoveByLogin
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method removeByLogin
	*/
	removeByLogin (req, res) {
		let query = {
			login: req.params.login
		}

		let teacher = new TeacherModel().deleteByField(query)

		Promise.all([
			teacher
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
