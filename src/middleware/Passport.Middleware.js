/**
 * @namespace Middleware
 * @property {module:Passport} Passport
 */
/**
 * Each protected route pass through this Module. 
 * Passport Module hadle with recive a token authenticantion 
 * from some client that is intent to interact with CUC API and check if the recived 
 * token is valid. Case its VALID proced to route Case its NOT-VALID return 401 status 
 * code and unauthorized message
 * @module Passport
 */
'use strict'
/**
 * Passport Module
 * @const
 */
import Passport from 'passport'
/**
 * User Model Module
 * @const
 */
import User from '../models/User.Model'
/**
 * JWT Config Module
 * @const
 */
import config from '../config/jwt'
/**
 * Passport-JWT Config Module
 * @const
 */
import passportJWT from 'passport-jwt'

export default class PassportMiddleware {
	constructor (passport) {
		this.passport = passport
	}
	/**
	 * Protect Middleware Method.
	 * 
	 * Recives a token from passport module and checks the token still valid
	 * and belongs an valid User on mongodb User Collection.
	 * 
	 * @name Protect
	 * @method protect
	 * @todo Write comments
	*/
	protect () {
		let JwtStrategy = passportJWT.Strategy
		let ExtractJwt = passportJWT.ExtractJwt

		let opts = {
			'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(),
			'secretOrKey': config.secret
		}

		Passport.use(new JwtStrategy(opts, (payload, done) => {
			let query = {
				_id: payload._id
			}

			let user = new User(query).getById()

			Promise.all([
				user
			]).then(data => {
				if (data) {
					done(null, payload)
				} else {
					done(null, false)
				}
			}).catch(err => {
				if (err) {
					return done(err, false)
				}
			})
		}))
	}
}
