import passport from 'passport'
import User from '../models/User.Model'
import config from '../config/jwt'
import passportJWT from 'passport-jwt'

export default function (passport) {
  let JwtStrategy = passportJWT.Strategy
  let ExtractJwt = passportJWT.ExtractJwt

  let opts = {
    'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(),
    'secretOrKey': config.secret
  };
  
  passport.use(new JwtStrategy(opts, (payload, done) => {
    
    let query = {
      _id: payload._id
    }
    
    let user = new User(query).getById()

    Promise.all([
      user
    ]).then(data => {
      if (data) {
        done(null, payload);
      } else {
        done(null, false);
      }
    }).catch(err => {
      if (err) {
        return done(err, false);
      }
    })

  }))

};