/**
 * @namespace Route
 * @property {module:Auth} Auth
 */
/** Authorization Resource Routes
 * 	Routing the Controller Object through resource endpoints
 * @module Auth
 * @requires express
 */
'use strict'
/**
 * express module
 * @const 
 */
import express from 'express'
/**
 * Auth Controller Module
 * @const
 */
import AuthController from '../controllers/Auth.Controller'
/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
let router = express.Router()
/**
 * Auth Controller Object
 * @type {object}
 * @const
 */
let auth = new AuthController()
/**
 * POST /auth/login/
 * 
 * @name /auth/login/
 * @function
 * @todo write comments
 */
router.post('/login', (req, res) => {
	auth.login(req, res)
})
/**
 * POST /auth/singup/
 * 
 * @name /auth/singup/
 * @function
 * @todo write comments
 */
router.post('/singup', (req, res) => {
	auth.singup(req, res)
})

export default router
