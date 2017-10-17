import express from 'express'
import passport from 'passport'

import Class from '../controllers/Class.Controller'

const protect = passport.authenticate('jwt', {
	session: false
})

let router = express.Router()
/*
	import student RESOURCE CONTROLLER
*/
let cl = new Class()

router.get('/', protect, (req, res) => {
	res.json({
		'msg': 'Welcome to class endpoints'
	})
})

router.post('/', protect, (req, res) => {
	cl.save(req, res)
})

router.get('/:id', protect, (req, res) => {
	cl.getById(req, res)
})

router.put('/:id', protect, (req, res) => {
	cl.updateById(req, res)
})

router.delete('/:id', protect, (req, res) => {
	cl.removeById(req, res)
})

router.get('/teacher/:teacher_id', protect, (req, res) => {
	cl.teacherClasses(req, res)
})

export default router
