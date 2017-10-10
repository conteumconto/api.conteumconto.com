'use strict';
import BaseController from './Base.Controller'
import Student from '../models/Student.Model'
import User from './../models/User.Model'
import config from '../config/jwt'
import jwt from 'jsonwebtoken'

export default class AuthController {

  singup (req, res) {
    
    let data = req.body

    if (data.type === 'student') {

      let studentModel = new Student(data).persist()
      Promise.all([
        studentModel
      ]).then((value) => { 
        if(data) {
          res.json(this._generateToken(data))
        }
      }).catch(err => {
        let error_msg = Array()
        if (err.code == 11000) {
          if (err.errmsg.match(/email_1/)) {
            error_msg.push({
              error: 'Duplicate email',
            })
          } 
          if (err.errmsg.match(/login_1/)) {
            error_msg.push({
              error: 'Duplicate login',
            })
          }
        }
        res.json(error_msg);
        res.status(400);
      })
    } else if (data.type === 'teacher') {
      //todo
    }

  }

  login (req, res) {
    let data = {
      login: req.body.login
    }
    let user = new User(data).getByField()

    Promise.all([
      user
    ]).then((value) =>{
      if (value[0][0]) {
        if (req.body.password === value[0][0].password) {
          res.json(this._generateToken(value))
        } else {
          res.json({
            'Error': 'Invalid Password'
          })
        }
      } else {
        res.json({
          'Error': 'Invalid Mail'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  _generateToken (data) {
    let tokenInfo = {
      'email': data[0][0].email,
      'login': data[0][0].login,
      '_id': data[0][0]._id
    }
    console.log(tokenInfo)
    return {
      'acess_token': jwt.sign(tokenInfo, config.secret, {
        expiresIn: 10080, // in seconds
      }),
      'token_type': 'Bearer'
    }
  }
}
