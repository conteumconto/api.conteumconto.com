import express from 'express'
/*
  Import the resource controller, the code below its pretty intuitive :3
*/
import StudentController from '../controllers/StudentController'

let router = express.Router()

router.post('/', (req, res) => {
  new StudentController(req, res).save()
})

router.get('/:login', (req, res) => {
  new StudentController(req, res).studentByLogin()
})

router.put('/:login', (req, res) => {
  new StudentController(req, res).updateByLogin()
})

router.delete('/:login', (req, res) => {
  new StudentController(req, res).deleteByLogin()
})


export default router