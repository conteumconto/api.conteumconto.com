import express from 'express'
import passport from 'passport' 
import BookController from '../controllers/Book.Controller'

const protect = passport.authenticate('jwt', {
  session: false,
});

let router = express.Router()
/*
  import student RESOURCE CONTROLLER 
*/
let bk = new BookController()

router.get('/', protect, (req, res) => {
  res.json({
    'msg': 'Welcome to Book endpoints' 
  })
}) 

router.post('/', protect, (req, res) => {
  bk.save(req, res)
})

router.get('/:id', protect, (req, res) => {
  bk.getById(req, res)
})
 
router.put('/:id', protect, (req, res) => {
  bk.updateById(req, res)
})

router.delete('/:id', protect, (req, res) => {
  bk.removeById(req, res)
})

export default router