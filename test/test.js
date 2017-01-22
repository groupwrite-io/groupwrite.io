var should = require('should');
var Nightmare = require('nightmare');

describe('my first test', function () {
    it('is running', function () {
        true.should.equal(true);
    });
});

// Web tests
var url = 'http://localhost:3000';
require('../server');

// describe('Homepage', function () {
//     it('Sanity', function () {
//         yield Nightmare()
//             .goto('http://localhost:3000/')
//             .visible('#home-pagez')
//     });
// });

describe('Start page', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

    it('should show login form when loaded', function (done) {
        new Nightmare()
            .goto(url)
            .evaluate(function () {
                // return document.visible('#home-pagez')
                return document.querySelectorAll('#home-page').length;
            }).run(function (err, result) {
                result.should.equal(1);
                done();
            });
    });
});