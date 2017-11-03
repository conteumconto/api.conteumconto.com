/**
 * @namespace Services
 * @property {module:ErrorException} ErrorException
 */

/**
 * Extends Error Object with Status Code.
 * @module ErrorException
 */

'use strict'

export default class ErrorException extends Error {
	constructor (msg, code) {
		super(msg)
		this.code = code
		Error.captureStackTrace(this, ErrorException)
	}
}
