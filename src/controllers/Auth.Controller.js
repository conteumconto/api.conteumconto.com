'use strict';
import BaseController from './Base.Controller'
import Student from '../models/Student.Model'
import Teacher from '../models/Teacher.Model'

import User from './../models/User.Model'
import config from '../config/jwt'
import jwt from 'jsonwebtoken'
import HashPassword from '../services/HashPassword'

export default class AuthController {

  singup (req, res) {
    
    let data = req.body
    data.password = HashPassword.encrypt(data.password)

    if (data.type === 'student') {
      let studentModel = new Student(data).persist()
      Promise.all([
        studentModel
      ]).then((value) => { 
        if(value) {
          res.json(this._generateToken(value[0]))
          res.status(200);
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

      let teacherModel = new Teacher(data).persist()
      Promise.all([
        teacherModel
      ]).then((value) => { 
        if(value) {
          res.json(this._generateToken(value[0]))
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
        if (HashPassword.encrypt(req.body.password) === value[0][0].password) {
          res.json(this._generateToken(value[0][0]))
        } else {
          res.json({
            'Error': 'Invalid Password'
          })
        }
      } else {
        res.json({
          'Error': 'Invalid Login'
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  _generateToken (data) {
    let tokenInfo = {
      'email': data.email,
      'login': data.login,
      '_id': data._id
    }
    return {
      'acess_token': jwt.sign(tokenInfo, config.secret, {
        expiresIn: 10080, // in seconds
      }),
      'token_type': 'Bearer'
    }
  }
}
