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
import StudentController from './Student.Controller'
import ChapterController from './Chapter.Controller'
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
	 * @name SaveBook
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method saveBook
	*/
	saveBook (req, res) {
		let bookWithStudent = req.body
		bookWithStudent._student = req.user._id

		// 1. Save book in DB, returning its ID
		new this.Model(bookWithStudent).persist()
			.then(data => {
				this._book = data
				return this._book._id
			})
			// 2. Add book ID to student books array list
			.then(id => new Student().AddingBookToList(req.user._id, id))
			// 3. Return book
			.then(data => {
				if (data) res.status(200).json(this._book)
				else throw new Error('book_not_saved')
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'book_not_saved') res.status(400).json(err.message).end()
				else res.status(500).json(err.message).end()
			})
	}

	/**
	 * RemoveBook Method.
	 * Responds to DELETE /book/:id.
	 * Delete book by its ID and remove itself from user book list.
	 * If Success returns 200 status code and a json with the deleted book.
	 * If error return 400 status code and a json => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 *
	 * @name RemoveBook
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method RemoveBook
	 * @todo Write comments
	 */
	removeBook (req, res) {
		let data = {
			_id: req.params.id
		}

		let bookPromise = new this.Model(data).deleteById()
		let chapterPromise = new ChapterController().removeByBookIdList([].concat(req.params.id))
		let userPromise = new StudentController().removeBookFromList(req.user._id, req.params.id)

		Promise.all([bookPromise, chapterPromise, userPromise])
			.then(response => {
				if (!response[0]) throw new Error('object_not_deleted')
				else if (!response[1]) throw new Error('object_not_deleted')
				else if (!response[2]) throw new Error('object_not_updated')
				else res.status(200).json(response[0]).end()
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'object_not_deleted' || err.message === 'object_not_updated') {
					res.status(400).json(err.message).end()
				} else res.status(500).json(err.message).end()
			})
	}

	/**
	 * Get student books from books ID list
	 * @name GetStudentBooks
	 * @param {array} books
	 * @return {json} status and return array list of full books.
	 * @method getStudentBooks
	 */
	getStudentBooks (books) {
		return new this.Model().findByIdList({
			'_id': { $in: books }
		})
	}

	/**
	 * Get book chapters and filter through passed chapter ID
	 * @name RemoveChapterFromList
	 * @param {Long} bookId
	 * @param {Long} chapterId
	 * @method removeChapterFromList
	 */
	removeChapterFromList (bookId, chapterId) {
		return new this.Model({_id: bookId}).getById()
			.then(book => {
				book = book[0]
				book.chapters = book.chapters.filter(chapter => chapter.toString() !== chapterId)
				return new this.Model(book).updateById()
			})
	}
}
