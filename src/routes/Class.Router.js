/**
 * @namespace Route
 * @property {module:Class} Class
 */
/** Class Resource Routes
 *  Routing the Controller Object through resource endpoints
 * @module Class
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
 * Class Controller Module
 * @const
 */
import Class from '../controllers/Class.Controller'
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
 * Class Controller Object
 * @type {object}
 * @const
 */
let cl = new Class()
/**
 * GET /class/
 * Auth Required
 * @name /class/
 * @function
 * @return {json} -Welcome Endpoint Msg.
 * @todo write comments
 */
router.get('/', protect, (req, res) => {
	res.json({
		'msg': 'Welcome to class endpoints'
	})
})
/**
 * POST /class/
 * Save chapter Endpoint
 * Auth Required
 * @name /chapter/
 * @function
 * @todo write comments
 */
router.post('/', protect, (req, res) => {
	cl.save(req, res)
})
/**
 * GET /class/:id
 * Get class by ID Endpoint
 * Auth Required
 * @name /class/:id
 * @function
 * @todo write comments
 */
router.get('/:id', protect, (req, res) => {
	cl.getById(req, res)
})
/**
 * PUT /class/:id
 * Update class by ID Endpoint
 * Auth Required
 * @name /class/:id
 * @function
 * @todo write comments
 */
router.put('/:id', protect, (req, res) => {
	cl.updateById(req, res)
})
/**
 * DELETE /class/:id
 * Remove class by ID Endpoint
 * Auth Required
 * @name /class/:id
 * @function
 * @todo write comments
 */
router.delete('/:id', protect, (req, res) => {
	cl.removeById(req, res)
})
/**
 * GET /class/teacher/:teacher_id
 * Get All the Classes for a Teacher ID Endpoint
 * Auth Required
 * @name /class/teacher/:teacher_id
 * @function
 * @todo write comments
 */
router.get('/teacher/:teacher_id', protect, (req, res) => {
	cl.teacherClasses(req, res)
})

export default router
