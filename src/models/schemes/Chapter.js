'use strict'
import mongoose from 'mongoose'
/**
 * Restrictions
 */
const bookRestriction = {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Book',
	required: true
}

const titleRestriction = {
	type: String,
	required: [true, 'no title given'],
	minlength: [1, 'title is too short'],
	max: [40, 'title is too long']
}

const chapterTextRestriction = {
	type: String
}

const chapterSchema = new mongoose.Schema({
	_book: bookRestriction,
	title: titleRestriction,
	chapterText: chapterTextRestriction
})

export default mongoose.model('Chapters', chapterSchema)
