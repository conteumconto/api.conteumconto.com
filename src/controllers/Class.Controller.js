'use strict'
import BaseController from './Base.Controller'
import Class from '../models/Class.Model'

export default class ClassController extends BaseController {
	constructor () {
		super(Class)
	}

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
