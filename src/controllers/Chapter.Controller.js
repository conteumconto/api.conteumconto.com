/**
 * @namespace Controller
 * @property {module:ChapterController} ChapterController
 */
/**
 * ChapterController handle with Chapter Resource Api.
 * Pass a Chapter Object Model(\Models\ChapterModel) to the constructor
 * of parent class (\Controller\BaseController) for it map the basic database crud operations
 * to this Object.
 * @module ChapterController
 * @extends module:BaseController
 */
'use strict'
import BaseController from './Base.Controller'
import BookController from './Book.Controller'
import Chapter from '../models/Chapter.Model'
import Book from '../models/Book.Model'

export default class ChaperController extends BaseController {
	constructor () {
		super(Chapter)
	}

	/**
	 * Chapter Save Method.
	 * Responds to POST /chapter/:book_id.
	 * Saves the chapter with book ID, and then add chapter inside specific book list.
	 * If Success returns 200 status code and a json with this.Chapter saved data.
	 * If error return 400 status code and a json => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 *
	 * @name SaveChapter
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method save
	 * @todo Write comments
	*/
	saveChapter (req, res) {
		let chapterWithBook = req.body
		chapterWithBook._book = req.params.book_id

		// 1. Save chapter in DB, returning its ID
		new this.Model(chapterWithBook).persist()
			.then(data => {
				this._chapter = data
				return this._chapter._id
			})
			// 2. Add chapter ID to book chapters array list
			.then(chapterId => new Book().AddingChapterToList(req.params.book_id, chapterId))
			// 3. Return book
			.then(data => {
				if (data) res.status(200).json(this._chapter)
				else throw new Error('chapter_not_saved')
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'chapter_not_saved') res.status(400).json(err.message).end()
				else res.status(500).json(err.message).end()
			})
	}

	/**
	 * RemoveChapter Method.
	 * Responds to DELETE /chapter/:bookId/:chapterId.
	 * Delete chapter by its ID and remove itself from specific book list.
	 * If Success returns 200 status code and a json with the deleted chapter.
	 * If error return 400 status code and a json => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 *
	 * @name RemoveChapter
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method removeChapter
	 * @todo Write comments
	 */
	removeChapter (req, res) {
		let data = {
			_id: req.params.chapterId
		}

		let chapterPromise = new this.Model(data).deleteById()
		let bookPromise = new BookController().removeChapterFromList(req.params.bookId, req.params.chapterId)

		Promise.all([chapterPromise, bookPromise])
			.then(response => {
				if (!response[0]) throw new Error('object_not_deleted')
				else if (!response[1]) throw new Error('object_not_updated')
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
	 * Get books chapters from chapters ID list
	 * @name GetBooksChapters
	 * @param {array} books
	 * @return {json} status and return array list of full chapters.
	 * @method getBooksChapters
	 */
	getBooksChapters (chapters) {
		return new this.Model().findByIdList({
			'_id': { $in: chapters }
		})
	}

	/**
	 * Remove all chapters inside chapters docs with _books ID that matches list of books
	 * @name RemoveByBookIdList
	 * @param {array} books
	 * @return {json} status and return array list of deleted chapters.
	 * @method removeByBookIdList
	 */
	removeByBookIdList (books) {
		return new this.Model().removeByIdList({
			'_book': { $in: books }
		})
	}
}
