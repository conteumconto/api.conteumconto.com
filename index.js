import express from 'express'
import area from './routes/area'
let app = express()

app.use('/', area)

app.listen(3000, () => {
	console.log('Listening on 3000')
})

export default app