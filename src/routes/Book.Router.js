import express from 'express'

import BookController from '../controllers/Book.Controller'

let router = express.Router()
/*
  import student RESOURCE CONTROLLER 
*/
let bk = new BookController()

router.post('/', (req, res) => {
  bk.save(req, res)
})

router.get('/:id', (req, res) => {
  bk.getById(req, res)
})
 
router.put('/:id', (req, res) => {
  bk.updateById(req, res)
})

router.delete('/:id', (req, res) => {
  bk.removeById(req, res)
})

export default router