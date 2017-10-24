/**
 * @namespace Controller
 * @property {module:ChapterController} ChapterController
 */
/**
 * ChapterController handle with Chapter Resource Api.
 * Pass a Chapter Object Model(\Models\ChapterModel) to the constructor 
 * of parent class (\Controller\BaseController) for it map the basic database crud operations 
 * to this Object.
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
