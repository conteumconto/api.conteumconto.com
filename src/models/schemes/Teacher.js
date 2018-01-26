'use strict'
import mongoose from 'mongoose'
import User from './User'
/**
 * Restrictions
 */
const yearRestriction = {
	type: Number,
	min: 1900,
	max: 2500
}

const phoneRestriction = {
	type: String,
	required: [true, 'No phone given']
}

const cpfRestriction = {
	type: String,
	required: [true, 'No cpf given']
}

const graduationRestriction = {
	type: String
}

const schoolRestriction = {
	type: String
}

const emailRestriction = {
	type: String,
	required: [true, 'No email given'],
	index: [{
		unique: true
	}]
}

/**
 * Teacher Schema
 */

// Inheritance of the person model

const TeacherSchema = new mongoose.Schema({
	cpf: cpfRestriction,
	phone: phoneRestriction,
	current_school: schoolRestriction,
	graduation: graduationRestriction,
	year_graduation: yearRestriction,
	email: emailRestriction
})

export default User.discriminator('Teacher', TeacherSchema)
