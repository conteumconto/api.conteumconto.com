'use strict';
import BaseController from './BaseController'
import BookModel from '../models/BookModel'

export default class BookController extends BaseController {

  constructor() {
    super(BookModel)
  }
}