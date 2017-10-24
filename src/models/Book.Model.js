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
}
