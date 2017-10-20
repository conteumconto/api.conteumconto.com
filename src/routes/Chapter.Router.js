import express from 'express'
import passport from 'passport'

import Chapter from '../controllers/Chapter.Controller'

const protect = passport.authenticate('jwt', {
	session: false
})

let router = express.Router()
/*
	import student RESOURCE CONTROLLER
*/
let cp = new Chapter()

router.get('/', protect, (req, res) => {
	res.json({
		'msg': 'Welcome to chapter endpoints'
	})
})

router.post('/', protect, (req, res) => {
	cp.save(req, res)
})

router.get('/:id', protect, (req, res) => {
	cp.getById(req, res)
})

router.put('/:id', protect, (req, res) => {
	cp.updateById(req, res)
})

router.delete('/:id', protect, (req, res) => {
	cp.removeById(req, res)
})

export default router
