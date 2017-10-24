/**
 * @namespace Model
 * @property {module:StudentModel} StudentModel
 */
/**
 * StudentModel handle with Student Database Collection interactions.
 * @module StudentModel
 * @extends module:BaseModel
 */
'use strict'
/**
 * Student Scheme Module
 * @const
*/
import Student from './schemes/Student'
/**
 * BaseModel Module
 * @const
*/
import BaseModel from './Base.Model'
export default class StudentModel extends BaseModel {
	constructor (data) {
		super(Student, '_id', data)
	}
}
