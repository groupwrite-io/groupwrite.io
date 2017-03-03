var express = require('express')
var router = express.Router()
var Story = require('../../api/model/story')

router.get('/', function (req, res, next) {
  res.send('Stories page')
})

router.get('/:id([0-9a-f]+)', function (req, res, next) {
  let storyId = req.params.id
  Story.findOne({ _id: storyId }, (err, story) => {
    if (!story) {
      res.status(404).send(`Didn't find story with ID ${storyId}`)
      return
    }
    res.status(200).send(story)
  })
})

module.exports = router