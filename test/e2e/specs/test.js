// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.')
      .assert.containsText('h1', 'Welcome to Your Vue.js App')
      .assert.elementCount('img', 1)
      .end()
  }
}


/*

TODO Fix these:
(Worked back then in this commit:
https://github.com/write-io/write.io/commit/b91cdf287903387aca675365ce99866ab2dcb1ac
)

var should = require('should');
var Nightmare = require('nightmare');

// Web tests
require('../server');

var url = 'http://localhost:3000';

describe('Start page', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

    it('should show login form when loaded', function (done) {
        new Nightmare()
            .goto(url)
            .evaluate(function () {
                return document.querySelectorAll('#home-page').length;
            }).run(function (err, result) {
                result.should.equal(1);
                done();
            });
    });
});

describe('Game page', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

    it("should contain the 'List of Players'", function (done) {
        new Nightmare()
            .goto(url)
            .type('#choosenickname', 'ripper234')
            .click('#write-btn')
            .evaluate(function () {
                return document.querySelectorAll('#game-page h1')[0].innerHTML;
            }).run(function (err, result) {
                result.should.equal("List of players");
                done();
            });
    });

    it("should contain the current user's name", function (done) {
        var username = 'sinbad';
        new Nightmare()
            .goto(url)
            .type('#choosenickname', username)
            .click('#write-btn')
            .evaluate(function () {
                return document.querySelectorAll('#game-page')[0].innerHTML;
            }).run(function (err, result) {
                result.should.containEql(username);
                done();
            });
    });
});
*/