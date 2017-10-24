/**
 * @namespace Controller
 * @property {module:BookController} BookController
 */
/**
 * BookController handle with Book Resource Api.
 * Pass a Chapter Object Model(\Models\BookModel) to the constructor 
 * of parent class (\Controller\BaseController) for it map the basic database crud operations 
 * to this Object
 * @module BookController
 * @extends module:BaseController
 */
'use strict'
import BaseController from './Base.Controller'
import Book from '../models/Book.Model'

export default class BookController extends BaseController {
	constructor () {
		super(Book)
	}
}
