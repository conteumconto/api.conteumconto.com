'use strict'
import mongoose from 'mongoose'
import shortid from 'shortid'
// This model refers to the creation of any person(Student, Teacher...), which will be inherited by other models.

/**
 * Restrictions
 */

// Created by this teacher
const teacherRestriction = {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Teacher',
	required: [true, 'Teacher id required']
}

const classCodeRestriction = {
	type: String,
	'default': shortid.generate,
	index: {
		unique: true
	}
}

const classNameRestriction = {
	type: String,
	required: [true, 'Class name required']
}

const yearRestriction = {
	type: Number,
	required: [true, 'Year required']
}

const capacityRestriction = {
	type: Number,
	required: [true, 'Capacity required']
}

const courseRestriction = {
	type: String,
	required: [true, 'Course required']
}

const themeRestriction = {
	type: String,
	required: [true, 'Theme required']
}

const statusRestriction = {
	type: Boolean,
	required: [true, 'Status required']
}

// Will be modified by ObjectId
const schoolRestriction = {
	type: String,
	required: [true, 'School required']
}

/**
* Optional restrictions
*/

const startDateRestriction = {
	type: String
}

const endDateRestriction = {
	type: String
}

const commentsRestriction = {
	type: String
}

const bookRestriction = [{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Book'
}]

const studentRestriction = [{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Student'
}]

const classSchema = new mongoose.Schema({
	teacher: teacherRestriction,
	code: classCodeRestriction,
	name: classNameRestriction,
	year: yearRestriction,
	capacity: capacityRestriction,
	course: courseRestriction,
	theme: themeRestriction,
	school: schoolRestriction,
	status: statusRestriction,
	startDate: startDateRestriction,
	endDate: endDateRestriction,
	comments: commentsRestriction,
	students: studentRestriction,
	books: bookRestriction
})

export default mongoose.model('Class', classSchema)
