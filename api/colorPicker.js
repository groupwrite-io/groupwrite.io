const _ = require('underscore')
const colorPicker = {}
var _colors = []

colorPicker.init = function (colors) {
  _colors = colors
}

colorPicker.getColor = function (takenColors) {
  const availableColors = _.difference(_colors, takenColors || [])
  if (availableColors.length === 0) {
    throw new Error('No colors available.')
  }
  const randomIndex = _.random(0, availableColors.length - 1)
  return availableColors[randomIndex]
}

module.exports = colorPicker
