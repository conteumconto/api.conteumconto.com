/**
 * @namespace Controller
 * @property {module:StudentController} StudentController
*/
/**
 * StudentController handle with Student Resource Api.
 * Pass a Student Object Model(\Models\StudentModel) to the constructor
 * of parent class (\Controller\BaseController) for it map the basic database crud operations
 * to this Object.
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
 * Chapter.Controller Module
 * @const
*/
import ChapterController from './Chapter.Controller'
/**
 * Book.Controller Module
 * @const
*/
import BookController from './Book.Controller'
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
	 * If Success returns 200 status code and a json with student data.
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

		new StudentModel(data).getByField()
			.then(user => {
				if (user) res.status(200).json(user).end()
				else throw new Error('user_not_found')
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'user_not_found') res.status(400).json(err.message).end()
				else res.status(500).json(err.message).end()
			})
	}

	/**
	 * UpdateByLogin method.
	 * Responds to PUT /student/:login.
	 * If Success returns 200 status code and a json with student data.
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

		new StudentModel(req.body).updateByField(query)
			.then(user => {
				if (user) {
					delete user['password']
					res.status(200).json(user).end()
				} else throw new Error('user_not_updated')
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'user_not_updated') res.status(400).json(err.message).end()
				else res.status(500).json(err.message).end()
			})
	}
	/**
	 * RemoveByLogin method.
	 * Responds to DELETE /student/:login.
	 * If Success returns 200 status code and a json with number of rows affected (one).
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
		let books = []

		// 1. Get user from ID
		new StudentModel({_id: req.user._id}).getById()
			.then(user => {
				if (user.length !== 0) {
					user = user[0]
					books = user.books
					// 3. Remove user chapters or doesn't run the remove query, returning flag
					if (books.length === 0) return {not_remove_chapters: true}
					return new ChapterController().removeByBookIdList(books)
				} else throw new Error('object_not_found')
			})
			// 3. Remove user books or doesn't run the remove query, returning flag
			.then(response => {
				if (response.not_remove_chapters || response.result.n > 0) {
					if (books.length === 0) return {not_remove_books: true}
					return new BookController().removeByIdList(books)
				} else throw new Error('object_not_deleted')
			})
			// 4. Finally remove user
			.then(response => {
				if (response.not_remove_books || response.result.n > 0) return new StudentModel().deleteByField(query)
				else throw new Error('object_not_deleted')
			})
			.then(response => {
				if (response) res.status(200).json(response).end()
				else throw new Error('user_not_deleted')
			})
			// 5. Treat errors if user isn't deleted or not found
			.catch(err => {
				console.error(err)
				if (err.message === 'object_not_deleted' || err.message === 'object_not_found') {
					res.status(400).json(err.message).end()
				} else res.status(500).json(err.message).end()
			})
	}

	/**
	 * Get user books and filter through passed book ID
	 * @name RemoveBookFromList
	 * @param {Long} userId
	 * @param {Long} bookIdId
	 * @method removeBookFromList
	 */
	removeBookFromList (userId, bookId) {
		return new this.Model({_id: userId}).getById()
			.then(user => {
				user = user[0]
				user.books = user.books.filter(book => book.toString() !== bookId)
				return new this.Model(user).updateById()
			})
	}
}
