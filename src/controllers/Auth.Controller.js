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
	 * @todo Write comments
	 */
	signup (req, res) {
		let data = req.body
		data.password = HashPassword.encrypt(data.password)

		let model = {}
		if (data.type === 'student') model = new Student(data).persist()
		else if (data.type === 'teacher') model = new Teacher(data).persist()

		Promise.all([
			model
		]).then((value) => {
			if (value) {
				let user = value[0].toObject()
				delete user['password']

				let token = this._generateToken(user)
				res.set('authorization', `${token.type_token} ${token.acess_token}`)
				res.status(201).json(user)
			} else {
				res.status(500).json('Ops, aconteceu algum erro! Tente mais tarde.')
			}
		}).catch(err => {
			console.log(err)
			let errorMsg
			if (err.code === 11000) {
				if (err.errmsg.match(/email_1/)) {
					errorMsg = 'E-mail já existente! Tente cadastrar outro, ok?'
				}
				if (err.errmsg.match(/login_1/)) {
					errorMsg = 'Login já existente! Tente cadastrar outro, ok?'
				}
			}
			res.status(400).json(errorMsg)
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
	 * @todo Write comments
	*/
	login (req, res) {
		let data = {
			login: req.body.login
		}

		let user = new User(data).getByField()
		Promise.all([
			user
		]).then((value) => {
			if (value[0][0]) {
				let user = value[0][0].toObject()
				if (HashPassword.encrypt(req.body.password) === user.password) {
					delete user['password']

					let token = this._generateToken(user)
					res.set('authorization', `${token.type_token} ${token.acess_token}`)
					res.status(200).json(user)
				} else {
					res.status(403).json('Usuário ou senha inválidos!').end()
				}
			} else {
				res.status(403).json('Usuário ou senha inválidos!').end()
			}
		}).catch((err) => {
			console.log(err)
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
