/**
 * @namespace Controller
 * @property {module:BookController} BookController
 */
/**
 * BookController handle with Book Resource Api.
 * Pass a Chapter Object Model(\Models\BookModel) to the constructor
 * of parent class (\Controller\BaseController) for it map the basic database crud operations
 * to this Object.
 * @module BookController
 * @extends module:BaseController
 */
'use strict'
import BaseController from './Base.Controller'
import Book from '../models/Book.Model'
import Student from '../models/Student.Model'

export default class BookController extends BaseController {
	constructor () {
		super(Book)
		this._book = null
	}
	/**
	 * Book Save Method.
	 * Responds to POST /book.
	 * Saves the book with student ID, and then add book to student books list.
	 * If Success returns 200 status code and a json with this.Book saved data.
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
	saveBook (req, res) {
		let bookWithStudent = req.body
		bookWithStudent._student = req.user._id

		let bookPromise = new Promise((resolve, reject) => {
			new this.Model(bookWithStudent).persist()
				.then((data) => {
					this._book = data
					return resolve(this._book._id)
				})
				.catch((err) => {
					reject(err)
				})
		})

		let userPromise = bookPromise.then((id) => {
			return new Student().AddingBookToList(req.user._id, id)
		})

		Promise.all([
			bookPromise, userPromise
		]).then((data) => {
			if (data) {
				res.send(this._book)
				res.status(200)
				res.end()
			}
		}).catch(err => {
			console.log(err)
			res.json(err)
			res.status(400)
			res.end()
		})
	}
}
