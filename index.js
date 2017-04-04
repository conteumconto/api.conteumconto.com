/*
  Common
*/
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
/*
  Database Import
*/
import Database from './database/Database'
/*
  Endpoints
*/
import studentRouter from './routes/Student'
import bookRouter from './routes/Book'


let app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
/*
  [Database conection] -> refactor
*/
const conn = new Database('local')

/*
  routes to student resource
*/
app.use('/student', studentRouter)
app.use('/book', bookRouter)

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