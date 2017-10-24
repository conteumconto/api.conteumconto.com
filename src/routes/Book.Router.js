/**
 * @namespace Route
 * @property {module:Book} Book
 */
/** Book Resource Routes
 *  Routing the Controller Object through resource endpoints
 * @module Book
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
 * Book Controller Module
 * @const
 */
import BookController from '../controllers/Book.Controller'
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
 * Book Controller Object
 * @type {object}
 * @const
 */
let bk = new BookController()
/**
 * GET /book/
 * Auth Required
 * @name /book/
 * @function
 * @return {json} -Welcome Endpoint Msg.
 * @todo write comments
 */
router.get('/', protect, (req, res) => {
	res.json({
		'msg': 'Welcome to Book endpoints'
	})
})
/**
 * POST /book/
 * Save book Endpoint
 * Auth Required
 * @name /book/
 * @function
 * @todo write comments
 */
router.post('/', protect, (req, res) => {
	bk.save(req, res)
})
/**
 * GET /book/:id
 * Get Book by ID Endpoint
 * Auth Required
 * @name /book/:id
 * @function
 * @todo write comments
 */
router.get('/:id', protect, (req, res) => {
	bk.getById(req, res)
})
/**
 * PUT /book/:id
 * Update Book by ID Endpoint
 * Auth Required
 * @name /book/:id
 * @function
 * @todo write comments
 */
router.put('/:id', protect, (req, res) => {
	bk.updateById(req, res)
})
/**
 * DELETE /book/:id
 * Remove Book by ID Endpoint
 * Auth Required
 * @name /book/:id
 * @function
 * @todo write comments
 */
router.delete('/:id', protect, (req, res) => {
	bk.removeById(req, res)
})

export default router
