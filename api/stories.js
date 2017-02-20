var State = require('./state')
var Story = require('./model/story')

module.exports = function (router) {
  // TODO Delete this
  router.get('/story/create', function (req, res, next) {
    var story = new Story({ contributions: [] })
    res.status(200).send('Created story with date ' + story.date)
    story.save().then(() => {

    });
  })
  router.get('/story/list', function (req, res, next) {
    Story.find((err, stories) => {
      res.status(200).send(stories)
    })
  })
}