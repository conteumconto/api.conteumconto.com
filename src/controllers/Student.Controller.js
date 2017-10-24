/**
 * @namespace Controller
 * @property {module:StudentController} StudentController
*/
/**
 * StudentController handle with Class Resource Api.
 * Pass a models\StudentModel Object to the constructor 
 * of parent class (BaseController) for it map the basic crud operations 
 * to this Object
 * @module StudentController
 * @extends module:BaseController
*/
'use strict'
/**
 * Base.Controller Module
 * @const
*/
import BaseController from './Base.Controller'
/**
 * Student.Model Module
 * @const
*/
import StudentModel from '../models/Student.Model'
export default class StudentController extends BaseController {
	constructor () {
		super(StudentModel)
	}
	/**
	 * StudentByLogin method.
	 * Responds to GET /student/:login.
	 * If Sucess returns 200 status code and a json with student data.
	 * If error return 400 status code and a json => { errors }
	 * 500 status code only will be returned if the method generates some unexpected error
	 * 
	 * @name StudentByLogin
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method studentByLogin
	 * @todo Write comments
	*/
	studentByLogin (req, res) {
		let data = {
			login: req.params.login
		}

		let student = new StudentModel(data).getByField()

		Promise.all([
			student
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
	 * Responds to PUT /student/:login.
	 * If Sucess returns 200 status code and a json with student data.
	 * If error return 400 status code and a json => { errors }
	 * 500 status code only will be returned if the method generates some unexpected error
	 * 
	 * @name UpdateByLogin
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method updateByLogin
	 * @todo Write comments
	*/
	updateByLogin (req, res) {
		let query = {
			login: req.params.login
		}

		let student = new StudentModel(req.body).updateByField(query)

		Promise.all([
			student
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
	 * Responds to DELETE /student/:login.
	 * If Sucess returns 200 status code and a json with number of rows affected (one).
	 * If error return 400 status code and a json => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error
	 * 
	 * @name RemoveByLogin
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method removeByLogin
	 * @todo Write comments
	*/
	removeByLogin (req, res) {
		let query = {
			login: req.params.login
		}

		let student = new StudentModel().deleteByField(query)

		Promise.all([
			student
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
