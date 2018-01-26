/**
 * @namespace Controller
 * @property {module:AuthController} AuthController
 */

/**
 * AuthController handle with login and signup process.
 * @module AuthController
 */
'use strict'
/**
 * Student.Model Module
 * @const
 */
import Student from '../models/Student.Model'
/**
 * Teacher.Model Module
 * @const
 */
import Teacher from '../models/Teacher.Model'
/**
 * User.Model Module
 * @const
 */
import User from './../models/User.Model'
/**
 * Book.Controller Module
 * @const
 */
import BookController from '../controllers/Book.Controller'
/**
 * Chapter.Controller Module
 * @const
 */
import ChapterController from '../controllers/Chapter.Controller'
/**
 * JWT Config Object
 * @const
 */
import config from '../config/jwt'
/**
 * JWT module
 * @const
 */
import jwt from 'jsonwebtoken'
/**
 * HashPassword Service Module
 * @const
 */
import HashPassword from '../services/HashPassword'

export default class AuthController {
	/**
	 * Signup method.
	 * Responds to POST /auth/signup.
	 * If Success returns 201 status code, user-object and token-header => { acess_token: "", token_type: "" }.
	 * If error return 400 status code and a object => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 *
	 * @name Signup
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method signup
	 * @todo Refactor this method breaking him in 2. One for student signup and another for teacher signup.
	 */
	signup (req, res) {
		let data = req.body
		// 1. Encrypt password to be saved
		data.password = HashPassword.encrypt(data.password)

		// 2. Save user and get its promise
		let model = {}
		if (req.params.type === 'student') model = new Student(data).persist()
		else if (req.params.type === 'teacher') model = new Teacher(data).persist()

		model
			.then(user => {
				if (user) {
					delete user['password']
					let token = this._generateToken(user)
					res.set('authorization', `${token.type_token} ${token.acess_token}`)
					// 3. Send user without password and with token in response
					res.status(201).json(user).end()
				} else throw new Error('user_not_saved')
			})
			.catch(err => {
				console.error(err)
				let errorMsg
				if (err.code === 11000) {
					if (err.errmsg.match(/email_1/)) errorMsg = 'duplicate_email'
					else if (err.errmsg.match(/login_1/)) errorMsg = 'duplicate_login'
				} else errorMsg = err.message
				res.status(400).json(errorMsg).end()
			})
	}
	/**
	 * Login method.
	 * Responds to POST /auth/login.
	 * If Success returns 200 status code, user-object and token-header => { acess_token: "", token_type: "" }.
	 * If error return 403 status code and message of invalid credentials => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 *
	 * @name Login
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method login
	*/
	login (req, res) {
		const data = {
			login: req.body.login
		}

		let userWithBooks = null

		// 1. Get user from login
		new User(data).getByField()
			.then(user => {
				if (user.length !== 0) {
					user = user[0]
					if (HashPassword.encrypt(req.body.password) === user.password) {
						delete user['password']
						let token = this._generateToken(user)
						res.set('Authorization', `${token.type_token} ${token.acess_token}`)
						userWithBooks = user
						return new BookController().getStudentBooks(user.books)
					} else throw new Error('invalid_login_password')
				// User not found
				} else throw new Error('invalid_login_password')
			})
			// 2. Get student books
			.then(books => {
				let chapters = []
				books.forEach(book => {
					book.chapters.forEach(chapter => {
						chapters.push(chapter)
					})
				})
				userWithBooks.books = books
				if (chapters.length === 0) return chapters
				else return new ChapterController().getBooksChapters(chapters)
			})
			// 3. Get student chapters
			.then(chapters => {
				if (chapters.length !== 0) {
					userWithBooks.books.map(book => {
						book.chapters = []
						chapters = chapters.filter(chapter => {
							if (chapter._book.toString() === book._id.toString()) {
								let chapterWithoutBookId = Object.assign({}, chapter)
								delete chapterWithoutBookId['_book']
								book.chapters.push(chapterWithoutBookId)
							}
							return chapter._book.toString() !== book._id.toString()
						})
						return book
					})
				}
				// 4. Return user with books and inside chapters
				res.status(200).json(userWithBooks)
			})
			.catch(err => {
				console.error(err)
				if (err.message === 'invalid_login_password') res.status(403).json(err.message).end()
				else res.status(500).json(err.message).end()
			})
	}
	/**
	 * Receive a Mongoose Object Scheme of User type and generates a new JWT Token.
	 *
	 * @name _generateToken
	 * @param {object} data - models\schemes\UserModel Object.
	 * @return {json} json containing => { acess_token: "", token_type: "" }.
	 * @method _generateToken
	 * @private
	 * @todo Write comments
	*/
	_generateToken (data) {
		let tokenInfo = {
			'email': data.email,
			'login': data.login,
			'_id': data._id
		}
		return {
			'acess_token': jwt.sign(tokenInfo, config.secret, {
				expiresIn: 10080 // in seconds
			}),
			'type_token': 'Bearer'
		}
	}
}
