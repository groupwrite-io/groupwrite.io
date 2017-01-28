process.env.NODE_ENV = 'testing'

var should = require('should');
var Nightmare = require('nightmare');

// Set different ports so we can run tests while dev server is running
process.env.WEB_PORT = 8081
// TODO - this is still the standard socket.io port, not sure how to change it on the client
// http://stackoverflow.com/questions/41908504/vue-how-to-use-a-different-socket-io-port-in-tests
process.env.API_PORT = 3000


// Web tests
require('../../build/dev-server')
require('../../api/server');

console.log("~~~~ Webpack & API servers up, starting e2e tests ~~~~")

var url = `http://localhost:${process.env.WEB_PORT}`;
var testTimeout = 20000

function newNightmare() {
  return new Nightmare(
    {
      show: true // TODO
    }
  )
}

function loginPlayer(username) {
  return newNightmare()
    .goto(url)
    .type('#choosenickname', username)
    .click('#write-btn')
    .wait('div.game')
}

// Sample test to test concurrency in Nightmare
// TODO - delete this test
describe('MyTest', function () {
  this.timeout(20000);
  it('should work concurrently', function (done) {
    loginPlayer('1stuser').run()
    loginPlayer('2nduser').run()
    loginPlayer('3rduser').run(function (err, result) {
      done();
    })
  })
});

describe('Start page', function () {
  this.timeout(testTimeout);

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
  this.timeout(testTimeout);

  it("should contain the 'List of Players'", function (done) {
    loginPlayer('john').run();
    loginPlayer('doe').run();
    loginPlayer('sinbad')
      .evaluate(function () {
        return document.querySelectorAll('div.game')[0].innerHTML;
      })
      .run(function (err, result) {
        result.should.containEql("List of players");
        done();
      });
  });

  it("should contain the current user's name", function (done) {
    var players = ['sinbad', 'ali', 'baba'];
    loginPlayer(players[0]).run();
    loginPlayer(players[1]).run();
    loginPlayer(players[2])
      .evaluate(function () {
        return document.querySelectorAll('div.game')[0].innerHTML;
      })
      .end()
      .then(function (result) {
        // Check for all players
        result.should.containEql(players[0]);
        result.should.containEql(players[1]);
        result.should.containEql(players[2]);
        done();
      });
  });

  it("should return to home page when quit button is pressed", function (done) {
    loginPlayer('ali').run();
    loginPlayer('baba').run();
    loginPlayer('sinbad')
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