'use strict'
import mongoose from 'mongoose'
// This model refers to the creation of any person(Student, Teacher...), which will be inherited by other models.

/**
 * Restrictions
 */

const nameRestriction = {
	type: String,
	required: [true, 'No name given'],
	minlength: [3, 'Name too short'],
	maxlength: [100, 'Name too big']
}

const ageRestriction = {
	type: String,
	required: [true, 'No age given']
}

const loginRestriction = {
	type: String,
	required: [true, 'No login given'],
	index: {
		unique: true
	}
}

const passwordRestriction = {
	type: String,
	required: [true, 'No password given']
}

// Create Schema
const userSchema = new mongoose.Schema({
	first_name: nameRestriction,
	last_name: nameRestriction,
	age: ageRestriction,
	login: loginRestriction,
	password: passwordRestriction
})

export default mongoose.model('User', userSchema);