var State = require('./state')
var Story = require('./model/story')

module.exports = function (router) {
  router.get('/stories/list', function (req, res, next) {
    Story.find((err, stories) => {
      res.status(200).send(stories)
    })
  })
}