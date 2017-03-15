const colorPicker = require('../../../../api/colorPicker')

describe('Color picker', () => {
  beforeEach(() => {
    colorPicker.init(['red', 'green'])
  })

  it('Should pick a random color', () => {
    const color = colorPicker.getColor()
    expect(typeof color).to.equal('string')
  })

  it('Should pick a fresh color, given a different color', () => {
    const color = colorPicker.getColor(['red'])
    expect(color).to.equal('green')
  })

  it('Should throw an error when no colors left', () => {
    let exception

    try {
      colorPicker.getColor(['red', 'green'])
    } catch (e) {
      exception = e
    }

    expect(typeof exception).to.not.equal('undefined')
  })
})
