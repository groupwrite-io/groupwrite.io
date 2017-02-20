var State = require('./state')

module.exports = function (router) {
  // GET /adminState
  router.get('/adminState', function (req, res, next) {
    if (secret.adminKey !== req.query.adminKey) {
      res.status(401).send('Trying to access admin functions without proper key')
      return
    }

    res.send(State.getAdminState())
  })

  // POST /clearAll
  router.post('/clearAll', function (req, res, next) {
    // Only admin should be able to do this /adminState above
    // https://github.com/groupwrite-io/groupwrite.io/issues/55
    State.clearAll()
    server.io.emit('server:state')
    res.send(true)
  })
}