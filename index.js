/*
  Common
*/
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport' 

/*
  Database Import
*/
import Database from './src/database/Database'
/*
  Endpoints
*/
import student from './src/routes/Student.Router'
import book from './src/routes/Book.Router'
import chapter from './src/routes/Chapter.Router'
import cls from './src/routes/Class.Router'
import auth from './src/routes/Auth.Router'
/*
  middleware
*/
import protectMiddleware from './src/middleware/passport'
protectMiddleware(passport)

let app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/*
  [Database conection]
*/
Database.init()

/*
  routes to student resource
*/
app.use('/student', student)
app.use('/book', book)
app.use('/chapter', chapter)
app.use('/class', cls)
app.use('/auth', auth)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500);
  res.render('error')
})

app.listen(3000, () => {
	console.log('Listening on 3000')
})

export default app