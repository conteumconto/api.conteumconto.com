/**
 * @namespace Route
 * @property {module:Student} Student
 */
/** Student Resource Routes
 *  Routing the Controller Object through resource endpoints
 * @module Student
 * @requires express
 */
'use strict'
/**
 * express module
 * @const
 */
import express from 'express'
/**
 * passport module
 * @const
 */
import passport from 'passport'
/**
 * Student Controller Module
 * @const
 */
import StudentController from '../controllers/Student.Controller'
/**
 * Protected Route Middleware
 * @const
 */
const protect = passport.authenticate('jwt', {
	session: false
})
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
let router = express.Router()
/**
 * Student Controller Object
 * @type {object}
 * @const
 */
let st = new StudentController()
/**
 * GET /student/
 * Auth Required
 * @name /student/
 * @function
 * @return {json} -Welcome Endpoint Msg.
 * @todo write comments
 */
router.get('/', protect, (req, res) => {
	res.json({
		'msg': 'Welcome to Student endpoints'
	})
})
/**
 * POST /student/
 * Save student Endpoint
 * Auth Required
 * @name /student/
 * @function
 * @todo write comments
 */
router.post('/', protect, (req, res) => {
	st.save(req, res)
})
/**
 * GET /student/:id
 * Get student by ID Endpoint
 * Auth Required
 * @name /student/:id
 * @function
 * @todo write comments
 */
router.get('/:id', protect, (req, res) => {
	st.getById(req, res)
})
/**
 * PUT /student/:id
 * Update student by ID Endpoint
 * Auth Required
 * @name /student/:id
 * @function
 * @todo write comments
 */
router.put('/:id', protect, (req, res) => {
	st.updateById(req, res)
})
/**
 * DELETE /student/:id
 * Remove student by ID Endpoint
 * Auth Required
 * @name /student/:id
 * @function
 * @todo write comments
 */
router.delete('/:id', protect, (req, res) => {
	st.removeById(req, res)
})
/**
 * GET /student/login/:student_login
 * Get Student By Login
 * Auth Required
 * @name /student/login/:student_login
 * @function
 * @todo write comments
 */
router.get('/login/:login', protect, (req, res) => {
	st.studentByLogin(req, res)
})
/**
 * PUT /student/login/:student_login
 * Update Student By Login
 * Auth Required
 * @name /student/login/:student_login
 * @function
 * @todo write comments
 */
router.put('/login/:login', protect, (req, res) => {
	st.updateByLogin(req, res)
})
/**
 * DELETE /student/login/:student_login
 * Remove Student By Login
 * Auth Required
 * @name /student/login/:student_login
 * @function
 * @todo write comments
 */
router.delete('/login/:login', protect, (req, res) => {
	st.removeByLogin(req, res)
})

export default router
