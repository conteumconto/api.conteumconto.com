'use strict';
/*
  Class to controll the student resource
*/
import StudentModel from '../models/StudentModel'

export default class StudentController {

  /*
    Contructor recives the req,res,next methods from express router
  */
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  /*
    This method store a new student
    all the logic to data validation enter here
  */
  save () {
    /*
      All methods of Models returns a promise
    */
    let student = new StudentModel(this.req.body).persist()
    /*
      So we must to resolve the database promise and 
      send the response back
    */
    Promise.all([
			student
		]).then((data) => {
			if(data) {
        /*
          Because we recive the req function on constructor method 
          we have acess to then with `this`
        */
        this.res.send(data[0])
        this.res.status(201);
        this.res.end()
      }
		}).catch(err => {
      /*
        case any problem occurs this it's the right place to treat them
      */
			this.res.json(err);
      this.res.status(400);
      this.res.end();
		})
  }

  /*
    The other methods working based in the same premisses of save()
  */
  studentByLogin() {
    
    let data = {
      login: this.req.params.login
    }

    let student = new StudentModel(data).getByField()

    Promise.all([
			student
		]).then((data) => {
			if(data) {
        this.res.send(data[0])
        this.res.status(200);
        this.res.end()
      }
		}).catch(err => {
			this.res.json(err);
      this.res.status(400);
      this.res.end();
		})
  }

  updateByLogin() {
    let query = {
      login: this.req.params.login
    }

    let student = new StudentModel(this.req.body).updateByField(query)

    Promise.all([
			student
		]).then((data) => {
			if(data) {
        this.res.send(data[0])
        this.res.status(200);
        this.res.end()
      }
		}).catch(err => {
			this.res.json(err);
      this.res.status(400);
      this.res.end();
		})
  }

  deleteByLogin() {
    let query = {
      login: this.req.params.login
    }
    
    let student = new StudentModel().deleteByField(query)

    Promise.all([
			student
		]).then((data) => {
			if(data) {
        this.res.send(data[0])
        this.res.status(200);
        this.res.end()
      }
		}).catch(err => {
			this.res.json(err);
      this.res.status(400);
      this.res.end();
		})
  }

}