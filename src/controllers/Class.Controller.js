/**
 * @namespace Controller
 * @property {module:ClassController} ClassController
 */
/**
 * ClassController handle with Class Resource Api.
 * Pass a Class Object Model Class (\Models\ClassModel) to the constructor 
 * of parent class (\Controller\BaseController) for it map the basic crud database operations 
 * to this Object.
 * @module ClassController
 * @extends module:BaseController
 */
'use strict'
import BaseController from './Base.Controller'
import Class from '../models/Class.Model'

export default class ClassController extends BaseController {
	constructor () {
		super(Class)
	}
	/**
	 * TeacherClasses method.
	 * Responds to GET /teacher/:teacher_id
	 * If Success returns 200 status code and a json with the classes of one specific teacher.
	 * If error return 400 status code and a json => { errors }
	 * 500 status code only will be returned if the method generates some unexpected error
	 * 
	 * @name TeacherClasses
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status code 200 and a json with classes_id´s.
	 * @method teacherClasses
	 * @todo Write comments
	*/
	teacherClasses (req, res) {
		let data = {
			teacher: req.params.teacher_id
		}

		let classModel = new Class(data).getByField()

		Promise.all([
			classModel
		]).then((classes) => {
			if (classes) {
				res.json(classes[0])
				res.status(200)
			}
		}).catch(err => {
			console.log(err)
		})
	}
}
