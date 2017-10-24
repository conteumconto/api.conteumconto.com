/**
 * @namespace Controller
 * @property {module:AuthController} AuthController
 */

/**
 * AuthController handle with login and singup process.
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
 * HashPassord Service Module
 * @const
 */
import HashPassword from '../services/HashPassword'

export default class AuthController {
	/**
	 * Singup method.
	 * Responds to POST /auth/singup.
	 * If Sucess returns 200 status code and a object => { acess_token: "", token_type: "" }.
	 * If error return 400 status code and a object => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 * 
	 * @name Singup
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method singup
	 * @todo Refactor this method breaking him in 2. One for student singup and another for teacher singup
	 * @todo Write comments
	 */
	singup (req, res) {
		let data = req.body
		data.password = HashPassword.encrypt(data.password)
		if (data.type === 'student') {
			let studentModel = new Student(data).persist()
			Promise.all([
				studentModel
			]).then((value) => {
				if (value) {
					res.json(this._generateToken(value[0]))
					res.status(200)
				} else {
					res.send(500)
				}
			}).catch(err => {
				console.log(err)
				let errorMsg = []
				if (err.code === 11000) {
					if (err.errmsg.match(/email_1/)) {
						errorMsg.push({
							error: 'Duplicate email'
						})
					}
					if (err.errmsg.match(/login_1/)) {
						errorMsg.push({
							error: 'Duplicate login'
						})
					}
				}
				res.json(errorMsg)
				res.status(400)
			})
		} else if (data.type === 'teacher') {
			let teacherModel = new Teacher(data).persist()

			Promise.all([
				teacherModel
			]).then((value) => {
				if (value) {
					res.json(this._generateToken(value[0]))
				}
			}).catch(err => {
				let errorMsg = []

				if (err.code === 11000) {
					if (err.errmsg.match(/email_1/)) {
						errorMsg.push({
							error: 'Duplicate email'
						})
					}
					if (err.errmsg.match(/login_1/)) {
						errorMsg.push({
							error: 'Duplicate login'
						})
					}
				}
				res.json(errorMsg)
				res.status(400)
			})
		}
	}
	/**
	 * Login method.
	 * Responds to POST /auth/login.
	 * If Sucess returns 200 status code and a json => { acess_token: "", token_type: "" }.
	 * If error return 400 status code and message of invalid credentials => { errors }.
	 * 500 status code only will be returned if the method generates some unexpected error.
	 * 
	 * @name Login
	 * @param {object} req - Express requisition object.
	 * @param {object} res - Express response object.
	 * @return {json} status and return object.
	 * @method login
	 * @todo Write comments
	*/
	login (req, res) {
		let data = {
			login: req.body.login
		}
		console.log(data)
		let user = new User(data).getByField()
		Promise.all([
			user
		]).then((value) => {
			if (value[0][0]) {
				if (HashPassword.encrypt(req.body.password) === value[0][0].password) {
					res.json(this._generateToken(value[0][0]))
				} else {
					res.json({
						'Error': 'Invalid Password'
					})
				}
			} else {
				res.json({
					'Error': 'Invalid Login'
				})
			}
		}).catch(err => {
			console.log(err)
		})
	}
	/**
	 * generateToken
	 * Recive a models\schemes\UserModel Object and generates a new JWT Token
	 * with UserModel data.
	 * 
	 * @name _generateToken
	 * @param {object} data - models\schemes\UserModel Object.
	 * @return {json} json containing => { acess_token: "", token_type: "" }
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
