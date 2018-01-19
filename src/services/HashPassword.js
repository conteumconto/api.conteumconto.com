/**
 * @namespace Services
 * @property {module:HashPassword} HashPassword
 */

/**
 * Encrypt and Decrypt Password Service.
 * @module HashPassword
 */
'use strict'
/**
 * Crypto Module
 * @const
 */
import crypto from 'crypto'
/**
 * Hash Config Module
 * @const
 */
import hashConfig from '../config/hash'

export default class HashPassword {
	/**
	 * Encrypt a given string
	 *
	 * @name Encrypt
	 * @param {string} password - String to Hash.
	 * @return {string} - The String Hash.
	 * @method encrypt
	 * @static
	 * @todo Write comments
	*/
	static encrypt (password) {
		let cipher = crypto.createCipher(hashConfig.algorithm, hashConfig.password)
		let crypted = cipher.update(password, 'utf8', 'hex')
		crypted += cipher.final('hex')
		return crypted
	}
	/**
	 * Decrypt a given string
	 *
	 * @name Decrypt
	 * @param {string} password - String to Decrypt.
	 * @return {string} - The String Decrypt.
	 * @method decrypt
	 * @static
	 * @todo Write comments
	*/
	static decrypt (password) {
		let decipher = crypto.createDecipher(hashConfig.algorithm, hashConfig.password)
		let dec = decipher.update(password, 'hex', 'utf8')
		dec += decipher.final('utf8')
		return dec
	}
}
