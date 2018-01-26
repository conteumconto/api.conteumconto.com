/**
 * @namespace Model
 * @property {module:BookModel} BookModel
 */
/**
 * BookModel handle with Book Database Collection interactions.
 * @module BookModel
 * @extends module:BaseModel
 */
'use strict'
/**
 * Book Scheme Module
 * @const
*/
import Book from './schemes/Book'
/**
 * BaseModel Module
 * @const
*/
import BaseModel from './Base.Model'

export default class BookModel extends BaseModel {
	constructor (data) {
		super(Book, '_id', data)
	}

	/**
	 * Book AddingChapterToList Method.
	 * Query this.Schema pushing new chapter to list.
	 * When this promise is resolved this method retrieves the Object update in MongoDB.
	 *
	 * @name AddingChapterToList
	 * @param {String} bookId
	 * @param {Object} chapterId - Chapter Object ID
	 * @method addingChapterToList
	 * @return {object} Return a promise to who intend to update data.
	*/
	AddingChapterToList (bookId, chapterId) {
		return this.Scheme.update({_id: bookId}, {$push: {chapters: chapterId}}, { new: true })
	}
}
