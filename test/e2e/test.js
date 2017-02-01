process.env.NODE_ENV = 'testing'

var should = require('should');
var Nightmare = require('nightmare');

// Set different ports so we can run tests while dev server is running
process.env.WEB_PORT = 8081
// TODO - this is still the standard socket.io port, not sure how to change it on the client
// http://stackoverflow.com/questions/41908504/vue-how-to-use-a-different-socket-io-port-in-tests
process.env.API_PORT = 3000


// Web tests
require('../../api/server');

console.log("~~~~ Webpack & API servers up, starting e2e tests ~~~~")

var url = `http://localhost:${process.env.WEB_PORT}`;
var testTimeout = 20000

function newNightmare() {
  return new Nightmare(
    {
      show: true
    }
  )
}

Nightmare.prototype.loginPlayer = function (username) {
  return this
    .goto(url)
    .type('#choosenickname', username)
    .click('#write-btn')
}

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
    newNightmare().loginPlayer('john').run(() => { });
    newNightmare().loginPlayer('doe').run(() => { });
    newNightmare().loginPlayer('sinbad')
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
    var players = ['sinbad', 'ali', 'baba'];
    newNightmare().loginPlayer(players[0]).run(() => { });
    newNightmare().loginPlayer(players[1]).run(() => { });
    newNightmare().loginPlayer(players[2])
      .wait('div.game')
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
    newNightmare().loginPlayer('ali').run(() => { });
    newNightmare().loginPlayer('baba').run(() => { });
    var nightmare = newNightmare().loginPlayer('sinbad')
    nightmare
      .wait('div.game')
      .evaluate(function () {
        return document.querySelectorAll('#write-btn').length;
      })
      .then(function (result) {
        // No 'write' buttons found
        result.should.eql(0);
      })
      .then(function () {
        return nightmare
          .click('#quit-btn')
          .wait('div.home')
          .evaluate(function () {
            return document.querySelectorAll('#write-btn').length;
          })
      })
      .then(function (result) {
        // After quitting, we should have a write button
        result.should.eql(1);
        done();
      });
  });

  describe('Queue page', function () {
    this.timeout(testTimeout);

    // TODO Delete this
    // http://stackoverflow.com/questions/41914166/mocha-nightmare-test-failing-but-still-waiting-for-timeout
    xit("should fail before timeout", function (done) {
      var nightmare = new Nightmare({ show: true })
        .goto(url)
        .evaluate(function () {
        })
        .then(function (result) {
          throw "Fail" // This point is reached, and I expect the test to fail immediately at this point
        })
    })

    it("should kick a player out if they disconnect", function (done) {
      var nightmare = newNightmare()
      nightmare
        .loginPlayer('sinbad')
        .wait('div.queue')
        .evaluate(function () {
          return document.querySelectorAll('.waiting')[0].innerHTML;
        })
        .then(function (result) {
          // 1 player logged in
          result.should.containEql("Waiting for players 1/3");
        })
        .then(function () {
          return nightmare
            .loginPlayer('ali')
            .wait('div.queue')
            .evaluate(function () {
              return document.querySelectorAll('.waiting')[0].innerHTML;
            })
        })
        .then(function (result) {
          // We left the page, so we should not see our shadow in the queue!
          result.should.containEql("Waiting for players 1/3");
          done();
        })
    });
  })
});