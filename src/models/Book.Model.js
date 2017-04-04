'use strict';
import Book from './schema/Book';
import BaseModel from './Base.Model'

export default class BookModel extends BaseModel {

  constructor(data) {
    super(Book, '_id', data)
  }
 
}