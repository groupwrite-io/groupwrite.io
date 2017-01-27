process.env.NODE_ENV = 'testing'

var should = require('should');
var assert = require('assert');
var Nightmare = require('nightmare');

// Web tests
require('../../build/dev-server')
require('../../api/server');

console.log("~~~~ Webpack & API servers up, starting e2e tests ~~~~")

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

describe('Game page', function () {
  this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

  it("should contain the 'List of Players'", function (done) {
    new Nightmare()
      .goto(url)
      .type('#choosenickname', 'ripper234')
      .click('#write-btn')
      .wait('div.game')
      .evaluate(function () {
        return document.querySelectorAll('div.game')[0].innerHTML;
      }).run(function (err, result) {
        assert(!err);
        result.should.containEql("List of players");
        done();
      });
  });

  it("should contain the current user's name", function (done) {
    var username = 'sinbad';
    new Nightmare()
      .goto(url)
      .type('#choosenickname', username)
      .click('#write-btn')
      .wait('div.game')
      .evaluate(function () {
        return document.querySelectorAll('div.game')[0].innerHTML;
      }).run(function (err, result) {
        assert(!err);
        result.should.containEql(username);
        done();
      });
  });
});