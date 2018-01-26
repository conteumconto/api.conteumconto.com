'use strict'
import mongoose from 'mongoose'
import User from './User'

/**
 * Restrictions
 */

const bookRestriction = [{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Book'
}]

const emailRestriction = {
	type: String,
	index: [{
		// Unique + Sparse = If the email is not null, it has to be unique
		unique: true,
		sparse: true
	}]
}

// Inheritance of the person model
const StudentSchema = new mongoose.Schema({
	books: bookRestriction,
	email: emailRestriction
})

export default User.discriminator('Student', StudentSchema)
