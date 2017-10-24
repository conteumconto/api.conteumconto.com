/**
 * @namespace Model
 * @property {module:TeacherModel} TeacherModel
 */
/**
 * TeacherModel handle with Teacher Database Collection interactions.
 * @module TeacherModel
 * @extends module:BaseModel
 */
'use strict'
/**
 * Teacher Scheme Module
 * @const
*/
import Teacher from './schemes/Teacher'
/**
 * BaseModel Module
 * @const
*/
import BaseModel from './Base.Model'
export default class TeacherModel extends BaseModel {
	constructor (data) {
		super(Teacher, '_id', data)
	}
}
