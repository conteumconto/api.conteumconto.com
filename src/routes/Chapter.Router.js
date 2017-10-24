/**
 * @namespace Route
 * @property {module:Chapter} Chapter
 */
/** Chapter Resource Routes
 *  Routing the Controller Object through resource endpoints
 * @module Chapter
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
 * Chapter Controller Module
 * @const
 */
import Chapter from '../controllers/Chapter.Controller'
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
 * Chapter Controller Object
 * @type {object}
 * @const
 */
let cp = new Chapter()
/**
 * GET /chapter/
 * Auth Required
 * @name /chapter/
 * @function
 * @return {json} -Welcome Endpoint Msg.
 * @todo write comments
 */
router.get('/', protect, (req, res) => {
	res.json({
		'msg': 'Welcome to chapter endpoints'
	})
})
/**
 * POST /chapter/
 * Save chapter Endpoint
 * Auth Required
 * @name /chapter/
 * @function
 * @todo write comments
 */
router.post('/', protect, (req, res) => {
	cp.save(req, res)
})
/**
 * GET /chapter/:id
 * Get chapter by ID Endpoint
 * Auth Required
 * @name /chapter/:id
 * @function
 * @todo write comments
 */
router.get('/:id', protect, (req, res) => {
	cp.getById(req, res)
})
/**
 * PUT /chapter/:id
 * Update chapter by ID Endpoint
 * Auth Required
 * @name /chapter/:id
 * @function
 * @todo write comments
 */
router.put('/:id', protect, (req, res) => {
	cp.updateById(req, res)
})
/**
 * DELETE /chapter/:id
 * Remove chapter by ID Endpoint
 * Auth Required
 * @name /chapter/:id
 * @function
 * @todo write comments
 */
router.delete('/:id', protect, (req, res) => {
	cp.removeById(req, res)
})

export default router
