import express from 'express'
import passport from 'passport'
import StudentController from '../controllers/Student.Controller'

const protect = passport.authenticate('jwt', {
	session: false
})

let router = express.Router()
/*
	import student RESOURCE CONTROLLER
*/
let st = new StudentController()

router.get('/', protect, (req, res) => {
	res.json({
		'msg': 'Welcome to Student endpoints'
	})
})

/*
	routing the controller object through student resource endpoints
*/
router.post('/', protect, (req, res) => {
	st.save(req, res)
})

router.get('/:id', protect, (req, res) => {
	st.getById(req, res)
})

router.put('/:id', protect, (req, res) => {
	st.updateById(req, res)
})

router.delete('/:id', protect, (req, res) => {
	st.removeById(req, res)
})

router.get('/login/:login', protect, (req, res) => {
	st.studentByLogin(req, res)
})

router.put('/login/:login', protect, (req, res) => {
	st.updateByLogin(req, res)
})

router.delete('/login/:login', protect, (req, res) => {
	st.removeByLogin(req, res)
})

export default router
