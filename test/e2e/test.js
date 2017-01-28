process.env.NODE_ENV = 'testing'

var should = require('should');
var Nightmare = require('nightmare');

// Set different ports so we can run tests while dev server is running
process.env.API_PORT = 3001
process.env.WEB_PORT = 8081

// Web tests
require('../../build/dev-server')
require('../../api/server');

console.log("~~~~ Webpack & API servers up, starting e2e tests ~~~~")

function newNightmare() {
  return new Nightmare(
    {
      show: false
    }
  )
}
var testTimeout = 20000
var port = 8080
var url = `http://localhost:${port}`;

describe('Start page', function () {
  this.timeout(testTimeout); // Set timeout to 15 seconds, instead of the original 2 seconds

  it('should show login form when loaded', function (done) {
    newNightmare()
      .goto(url)
      .evaluate(function () {
        return document.querySelectorAll('div.home').length;
      })
      .run(function (err, result) {
        result.should.equal(1);
        done();
      });
  });
});

describe('Game page', function () {
  this.timeout(testTimeout); // Set timeout to 15 seconds, instead of the original 2 seconds

  it("should contain the 'List of Players'", function (done) {
    var username = 'sinbad';
    newNightmare()
      .goto(url)
      .type('#choosenickname', username)
      .click('#write-btn')
      .wait('div.game')
      .evaluate(function () {
        return document.querySelectorAll('div.game')[0].innerHTML;
      })
      .run(function (err, result) {
        result.should.containEql("List of players");
        done();
      });
  });

  it("should contain the current user's name", function (done) {
    var username = 'sinbad';
    newNightmare()
      .goto(url)
      .type('#choosenickname', username)
      .click('#write-btn')
      .wait('div.game')
      .evaluate(function () {
        return document.querySelectorAll('div.game')[0].innerHTML;
      })
      .end()
      .then(function (result) {
        result.should.containEql(username);
        done();
      });
  });

  it("should return to home page when quit button is pressed", function (done) {
    var username = 'sinbad';
    newNightmare()
      .goto(url)
      .type('#choosenickname', username)
      .click('#write-btn')
      .wait('div.game')

      // TODO http://stackoverflow.com/questions/41907654/how-to-assert-at-multiple-points-during-execution-of-a-nightmare-test
      // .evaluate(function () {
      //   return document.querySelectorAll('#write-btn').length;
      // })
      // .then(function (result) {
      //   // No 'write' buttons found
      //   result.should.eql(0);
      // })
      .click('#quit-btn')
      .wait('div.home')
      .evaluate(function () {
        return document.querySelectorAll('#write-btn').length;
      })
      .then(function (result) {
        // After quitting, we should have a write button
        result.should.eql(1);
        done();
      });
  });
});