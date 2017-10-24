/**
 * @namespace Controller
 * @property {module:ChapterController} ChapterController
 */
/**
 * ChapterController handle with chapter Resource Api.
 * @module ChapterController
 * @extends module:BaseController
 */
'use strict'
import BaseController from './Base.Controller'
import Chapter from '../models/Chapter.Model'

export default class ChaperController extends BaseController {
	constructor () {
		super(Chapter)
	}
}
