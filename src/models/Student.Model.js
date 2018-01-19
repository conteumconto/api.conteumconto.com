/**
 * @namespace Model
 * @property {module:StudentModel} StudentModel
 */
/**
 * StudentModel handle with Student Database Collection interactions.
 * @module StudentModel
 * @extends module:BaseModel
 */
'use strict'
/**
 * Student Scheme Module
 * @const
*/
import Student from './schemes/Student'
/**
 * BaseModel Module
 * @const
*/
import BaseModel from './Base.Model'
export default class StudentModel extends BaseModel {
	constructor (data) {
		super(Student, '_id', data)
	}
	/**
	 * Student AddingBookToList Method.
	 * Query this.Schema pushing new book to list.
	 * When this promise is resolved this method retrieves the Object update in MongoDB.
	 *
	 * @name AddingBookToList
	 * @param {String} userLogin
	 * @param {Object} id - Book Object ID
	 * @method addingBookToList
	 * @return {object} Return a promise to who intend to update data.
	*/
	AddingBookToList (userLogin, id) {
		return this.Scheme.update({_id: userLogin}, {$push: {books: id}}, { new: true })
	}
}
