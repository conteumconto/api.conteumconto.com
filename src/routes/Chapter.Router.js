import express from 'express'

import Chapter from '../controllers/Chapter.Controller'

let router = express.Router()
/*
  import student RESOURCE CONTROLLER 
*/
let cp = new Chapter()

router.post('/', (req, res) => {
  cp.save(req, res)
})

router.get('/:id', (req, res) => {
  cp.getById(req, res)
})
 
router.put('/:id', (req, res) => {
  cp.updateById(req, res)
})
//58e3b7673c94240628b9380d
router.delete('/:id', (req, res) => {
  cp.removeById(req, res)
})

export default router