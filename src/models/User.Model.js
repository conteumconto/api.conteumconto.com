/**
 * @namespace Model
 * @property {module:UserModel} UserModel
 */
/**
 * UserModel handle with User Database Collection interactions.
 * @module UserModel
 * @extends module:UserModel
 */
'use strict'
import User from './schemes/User'
/**
 * User Scheme Module
 * @const
*/
import BaseModel from './Base.Model'
export default class UserModel extends BaseModel {
	constructor (data) {
		super(User, '_id', data)
	}
}
