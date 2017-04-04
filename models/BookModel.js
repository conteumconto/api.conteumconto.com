'use strict';
import Book from './schema/Book';
import BaseModel from './BaseModel'

export default class BookModel extends BaseModel {

  constructor(data) {
    super(Book, '_id', data)
  }
 
}