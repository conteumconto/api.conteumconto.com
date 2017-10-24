/**
 * @namespace Controller
 * @property {module:BookController} BookController
 */
/**
 * BookController handle with Book Resource Api.
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
