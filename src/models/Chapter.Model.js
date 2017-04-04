'use strict';
import Chapter from './schema/Chapter';
import BaseModel from './Base.Model'

export default class ChapterModel extends BaseModel {

  constructor(data) {
    super(Chapter, '_id', data)
  }
 
}