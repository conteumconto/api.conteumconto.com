'use strict'
import mongoose from 'mongoose'
/**
 * Restrictions
 */

const studentRestriction = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Student',
  required: true,
};

const titleRestriction = {
  type: String,
  required: [true, 'no title given'],
  minlength: [1, 'title is too short'],
  max: [40, 'title is too long'],
};

const summaryRestriction = {
  type: String,
  minlength: [30, 'summary is too short'],
  max: [255, 'summary is too long'],
};

const tagsRestriction = [{
  type: String,
}];

const activeRestriction = {
  type: Boolean,
  default: true,
};

const chaptersRestriction = [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Chapters',
  required: true,
}];

/**
 * Book Schema
 */

const BookSchema = new mongoose.Schema({
  _student: studentRestriction,
  title: titleRestriction,
  summary: summaryRestriction,
  tags: tagsRestriction,
  active: activeRestriction,
  chapters: chaptersRestriction,
});

export default mongoose.model('Book', BookSchema);