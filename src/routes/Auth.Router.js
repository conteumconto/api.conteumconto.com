import express from 'express'
/*
	Import the resource controller, the code below its pretty intuitive :3
*/
import AuthController from '../controllers/Auth.Controller'

let router = express.Router()
/*
	import student RESOURCE CONTROLLER 
*/
let auth = new AuthController()
/*
	routing the controller object through student resource endpoints
*/

router.post('/login', (req, res) => {
	auth.login(req, res)
})

router.post('/singup', (req, res) => {
	auth.singup(req, res)
})

export default router
