import crypto from 'crypto'
import hashConfig from '../config/hash'
export default class HashPassword {
  
  static encrypt (password) {
    let cipher = crypto.createCipher(hashConfig.algorithm, hashConfig.password)
    let crypted = cipher.update(password, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  static decrypt (password) {
    let decipher = crypto.createDecipher(hashConfig.algorithm, hashConfig.password)
    let dec = decipher.update(password, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }

}