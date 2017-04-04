import express from 'express'
/*
  Import the resource controller, the code below its pretty intuitive :3
*/
import StudentController from '../controllers/Student.Controller'

let router = express.Router()
/*
  import student RESOURCE CONTROLLER 
*/
let st = new StudentController()


/*
  routing the controller object through student resource endpoints
*/
router.post('/', (req, res) => {
  st.save(req, res)
})

router.get('/:id', (req, res) => {
  st.getById(req, res)
})
 
router.put('/:id', (req, res) => {
  st.updateById(req, res)
})

router.delete('/:id', (req, res) => {
  st.removeById(req, res)
})

router.get('/login/:login', (req, res) => {
   st.studentByLogin(req, res)
})

router.put('/login/:login', (req, res) => {
  st.updateByLogin(req, res)
})

router.delete('/login/:login', (req, res) => {
  st.removeByLogin(req, res)
})


export default router