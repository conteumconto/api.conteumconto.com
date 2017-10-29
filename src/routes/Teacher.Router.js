/**
 * @namespace Route
 * @property {module:Teacher} Teacher
 */
/** Teacher Resource Routes
 *  Routing the Controller Object through resource endpoints
 * @module Teacher
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
 * Teacher Controller Module
 * @const
 */
import TeacherController from '../controllers/Teacher.Controller'
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
 * Teacher Controller Object
 * @type {object}
 * @const
 */
let tc = new TeacherController()
/**
 * GET /teacher/
 * Auth Required
 * @name /teacher/
 * @function
 * @return {json} -Welcome Endpoint Msg.
 */
router.get('/', protect, (req, res) => {
	res.json({
		'msg': 'Welcome to Teacher endpoints'
	})
})
/**
 * POST /teacher/
 * Save Teacher Endpoint
 * Auth Required
 * @name /teacher/
 * @function
 * @todo write comments
 */
router.post('/', protect, (req, res) => {
	tc.save(req, res)
})
/**
 * GET /teacher/:id
 * Get teacher by ID Endpoint
 * Auth Required
 * @name /teacher/:id
 * @function
 */
router.get('/:id', protect, (req, res) => {
	tc.getById(req, res)
})
/**
 * PUT /teacher/:id
 * Update teacher by ID Endpoint
 * Auth Required
 * @name /teacher/:id
 * @function
 */
router.put('/:id', protect, (req, res) => {
	tc.updateById(req, res)
})
/**
 * DELETE /teacher/:id
 * Remove class by ID Endpoint
 * Auth Required
 * @name /teacher/:id
 * @function
 * @todo write comments
 */
router.delete('/:id', protect, (req, res) => {
	tc.removeById(req, res)
})
/**
 * GET /teacher/login/:teacher_login
 * Get Teacher By Login
 * Auth Required
 * @name /teacher/login/:teacher_login
 * @function
 * @todo write comments
 */
router.get('/login/:login', protect, (req, res) => {
	tc.teacherByLogin(req, res)
})
/**
 * PUT /teacher/login/:teacher_login
 * Update Teacher By Login
 * Auth Required
 * @name /teacher/login/:teacher_login
 * @function
 */
router.put('/login/:login', protect, (req, res) => {
	tc.updateByLogin(req, res)
})
/**
 * DELETE /teacher/login/:teacher_login
 * Remove Teacher By Login
 * Auth Required
 * @name /teacher/login/:teacher_login
 * @function
 */
router.delete('/login/:login', protect, (req, res) => {
	tc.teacherByLogin(req, res)
})

export default router
