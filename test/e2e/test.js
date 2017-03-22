process.env.NODE_ENV = 'testing'

var should = require('should');
var Nightmare = require('nightmare');

// Set different ports so we can run tests while dev server is running
process.env.WEB_PORT = 8081

// Web tests
require('../../build/server');

console.log("~~~~ Webpack & API servers up, starting e2e tests ~~~~")

var url = `http://localhost:${process.env.WEB_PORT}`;
var testTimeout = 30000

function newNightmare() {
  return new Nightmare({
    show: true,
    waitTimeout: testTimeout,
    executionTimeout: testTimeout
  })
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
      })
      .catch(done);
  });
});

describe('Game page', function () {
  this.timeout(testTimeout);

  it("should contain the 'Players'", function (done) {
    newNightmare().loginPlayer('john').run(() => { });
    newNightmare().loginPlayer('doe').run(() => { });
    newNightmare().loginPlayer('sinbad')
      .wait('div.game')
      .evaluate(function () {
        return document.querySelectorAll('div.game')[0].innerHTML;
      })
      .run(function (err, result) {
        result.should.containEql("Players");
        done();
      })
      .catch(done);
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
      })
      .catch(done);
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
      })
      .catch(done);
  });

  it("should select a player's suggestion as story title if its get a majority vote", function (done) {
    // This test should be refactored, too much duplicate code here
    // *** exact copy of next test which was deleted change html selectors to make it work.
    // https://github.com/groupwrite-io/groupwrite.io/issues/61

    var suggestion = "Dolly and her special Lamb";
    var players = ['player1', 'player2', 'player3'];
    var p1 = newNightmare().loginPlayer(players[0]).run(() => { });
    var p2 = newNightmare().loginPlayer(players[1]).run(() => { });
    var p3 = newNightmare();

    p3.loginPlayer(players[2])
      .wait('div.game')
      .evaluate(function () {
        return document.querySelectorAll('div.game')[0].innerHTML;
      })
      .then(function (result) {
        // Check for all players
        result.should.containEql(players[0]);
        result.should.containEql(players[1]);
        result.should.containEql(players[2]);
      })
      .then(function () {
        p3.type('.suggestion', suggestion)
          .click('#submit-btn')
          .wait('#story')
          .evaluate(function () {
            return {
              mytext: document.querySelector('#mytext').value,
              story: document.querySelectorAll('#story')[0].innerHTML
            }
          })
          .then(function (result) {
            result.mytext.should.containEql(suggestion)
            result.story.should.not.containEql(suggestion)
          })
          .then(function () {
            p1.wait('.vote-button')
              .evaluate(() => {
                var suggestions = document.querySelectorAll('.suggestion')
                // debugger
                console.log("Starting iteration")

                suggestions.forEach(s => {
                  if (s.innerHTML.trim() === "Dolly and her special Lamb") {
                    var parent = s.parentNode;
                    var voteButton = parent.querySelector('.vote-button')
                    var event = document.createEvent('MouseEvent');
                    event.initEvent('click', true, true);

                    console.log("Clicking p1")
                    voteButton.dispatchEvent(event);
                  } else {
                    console.log("Didn't find it in: " + s.innerHTML.trim())
                  }
                })
                console.log("Done iterating")
              }).run(() => { });
            p2.wait('.vote-button')
              .evaluate(() => {
                var suggestions = document.querySelectorAll('.suggestion')
                // debugger
                console.log("Starting iteration")

                suggestions.forEach(s => {
                  if (s.innerHTML.trim() === "Dolly and her special Lamb") {
                    var parent = s.parentNode;
                    var voteButton = parent.querySelector('.vote-button')
                    var event = document.createEvent('MouseEvent');
                    event.initEvent('click', true, true);

                    console.log("Clicking p2")
                    voteButton.dispatchEvent(event);
                  } else {
                    console.log("Didn't find it in: " + s.innerHTML.trim())
                  }
                })
                console.log("Done iterating")
              }).run(() => { });
            p3.wait('#story-title')
              .evaluate(function () {
                return document.querySelectorAll('#story-title')[0].innerHTML
              })
              .then(function (result) {
                debugger
                result.should.containEql(suggestion)
                done()
              })
              .catch(done)
          })
      })
      .catch(done);
  });
})

describe('Queue page', function () {
  this.timeout(testTimeout);

  // https://github.com/write-io/groupwrite.io/issues/24
  xit("should kick a player out if they disconnect", function (done) {
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
      .catch(done)
  });
})
