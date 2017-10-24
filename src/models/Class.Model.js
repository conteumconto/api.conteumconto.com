/**
 * @namespace Model
 * @property {module:ClassModel} ClassModel
 */
/**
 * ClassModel handle with Class Database Collection interactions.
 * @module ClassModel
 * @extends module:BaseModel
 */
'use strict'
/**
 * CLass Scheme Module
 * @const
*/
import Classg from './schemes/Class'
/**
 * BaseModel Module
 * @const
*/
import BaseModel from './Base.Model'
export default class TeacherModel extends BaseModel {
	constructor (data) {
		super(Classg, '_id', data)
	}
}
