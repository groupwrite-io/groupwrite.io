var Story = require('./model/story')

module.exports = function (router) {
  router.get('/stories/list', function (req, res, next) {
    Story.find((err, stories) => {
      res.status(200).send(stories)
    })
  })

  router.get('/stories/get', function (req, res, next) {
    let storyId = req.query.storyId
    Story.findOne({ _id: storyId }, (err, story) => {
      res.status(200).send(story)
    })
  })
}