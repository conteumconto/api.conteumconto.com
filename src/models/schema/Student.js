'use strict'
import mongoose from 'mongoose'
/**
 * Restrictions
 */

const nameRestriction = {
  type: String,
  required: [true, 'No name given'],
  minlength: [3, 'Name too short'],
  maxlength: [100, 'Name too big'],
}

const birthDayRestriction = {
  type: String,
  required: [true, 'No birth day given'],
}

const emailRestriction = {
  type: String,
  required: [true, 'No email given'],
  index: [{unique: true}, 'Duplicate '],
}
const bookRestriction = [{
  type: mongoose.Schema.Types.ObjectId, ref: 'Book',
}]
// todo: make login unique
const loginRestriction = {
  type: String,
  required: [true, 'No login given'],
  index: { unique: true },
}

const passwordRestriction = {
  type: String,
  required: [true, 'No password given'],
}

/**
 * Student Schema
 */

const StudentSchema = new mongoose.Schema({
  first_name: nameRestriction,
  last_name: nameRestriction,
  birth_day: birthDayRestriction,
  email: emailRestriction,
  login: loginRestriction,
  password: passwordRestriction,
  books: bookRestriction,
})

export default mongoose.model('Student', StudentSchema)