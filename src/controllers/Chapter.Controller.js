'use strict'
import BaseController from './Base.Controller'
import Chapter from '../models/Chapter.Model'

export default class ChaperController extends BaseController {
	constructor () {
		super(Chapter)
	}
}
