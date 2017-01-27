process.env.NODE_ENV = 'testing'

var should = require('should');
var Nightmare = require('nightmare');

// Web tests
require('../../build/dev-server')
require('../../api/server');

var url = 'http://localhost:8080';

describe('Start page', function () {
  this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

  it('should show login form when loaded', function (done) {
    new Nightmare()
      .goto(url)
      .evaluate(function () {
        return document.querySelectorAll('div.home').length;
      }).run(function (err, result) {
        result.should.equal(1);
        done();
      });
  });
});

describe.skip('Game page', function () {
  this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

  it("should contain the 'List of Players'", function (done) {
    new Nightmare()
      .goto(url)
      .type('#choosenickname', 'ripper234')
      .click('#write-btn')
      .evaluate(function () {
        return document.querySelectorAll('game h1')[0].innerHTML;
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