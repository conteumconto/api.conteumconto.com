/**
 * @namespace Model
 * @property {module:ChapterModel} ChapterModel
 */
/**
 * ChapterModel handle with Chapter Database Collection interactions.
 * @module ChapterModel
 * @extends module:BaseModel
 */
'use strict'
/**
 * Chapter Scheme Module
 * @const
*/
import Chapter from './schemes/Chapter'
/**
 * BaseModel Module
 * @const
*/
import BaseModel from './Base.Model'

export default class ChapterModel extends BaseModel {
	constructor (data) {
		super(Chapter, '_id', data)
	}
}
