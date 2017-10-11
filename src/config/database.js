export default {
  dev: {
    local:{
      host: 'localhost',
      port: '27017',
      database: 'conte-um-conto'
    }
  },
  production: {
    conections: [{
      provider: 'heroku'
    }]
  }
}