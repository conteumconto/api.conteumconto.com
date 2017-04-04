import Database from '../../database/Database'
import chai from 'chai'

chai.should()
let expect = chai.expect

describe('Database connection test', () => {
  it('Shoud connect to database', (done) => {
    let conn = new Database('local')
    done()
  })
})