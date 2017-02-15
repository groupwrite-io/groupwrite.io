# README #

[![CircleCI](https://circleci.com/gh/groupwrite-io/groupwrite.io.svg?style=svg)](https://circleci.com/gh/groupwrite-io/groupwrite.io)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/680/badge)](https://bestpractices.coreinfrastructure.org/projects/680)

**[groupwrite.io](http://groupwrite.io)** is a collaborative writing game. You connect to the server (via browser, no install needed). The server then quickly matches you with a few fellow players to form a new writing group. All members of the writing group are online now, and start collaborating on writing a new story. The game works in rounds: in each round, players suggest different continuations to the current, ongoing story.

Every player sees in real time what every other player is writing, and can vote on his preferred continuation to the current plot. Once a particular continuation gets enough votes, it gets added to the ongoing story, and the round finishes (round often take around one minute). When a player suggests “The End” of the story, and his suggestions gets enough votes, the game and the story end.

The end result is a collaboratively created story.

* [Follow Our Blog](https://medium.com/groupwrite-io) for updates
* [Current Tasks](https://github.com/ripper234/groupwrite.io/projects/1)
* [Slack](https://www.hamsterpad.com/chat/writeio)
* [A sample story created with groupwrite.io](https://www.facebook.com/ripper234/posts/10153753024424159)
* [Give us a :star:](https://github.com/groupwrite-io/groupwrite.io)

### Dependencies / Tech Stack ###

* git
* [Node](https://nodejs.org)
* [Express](http://expressjs.com/) web server
* [Vue](https://vuejs.org/) frontend framework
* [Socket.io](http://socket.io/) for realtime communications / websockets
* [Webpack](https://webpack.github.io/) for bundling everything up
* [Babel](https://babeljs.io/) / [ES2016](http://es6-features.org/) for modern Javascript
* [eslint](http://eslint.org/) for quality control
* [mocha](https://mochajs.org/) for testing, [Nightmare](http://www.nightmarejs.org/) for web testing
* [CircleCI](circleci.com/gh/groupwrite-io/groupwrite.io/) for Continous Integration & Deployment
* [Slack](https://www.hamsterpad.com/chat/writeio) for communications
* [Medium](https://medium.com/groupwrite-io) for blogging

### How do I get set up? ###

* git pull
* npm install
* npm start
* [http://localhost:3000/](http://localhost:3000/)
* (See also admin screen at [http://localhost:3000/admin](http://localhost:3000/admin))

### Contribution guidelines ###

* We're having weekly coding sessions in Tel Aviv, usually on Thursday evening or Friday noonish. You're welcome to join!
* Start by looking at some of our [starter tasks](https://github.com/groupwrite-io/groupwrite.io/labels/starter-task), [high-priority](https://github.com/groupwrite-io/groupwrite.io/issues?q=is%3Aissue+is%3Aopen+label%3Apriority-high) and [medium-priority](https://github.com/groupwrite-io/groupwrite.io/issues?q=is%3Aissue+is%3Aopen+label%3Apriority-medium) tasks.


TBD:
* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

For any questions, contact Ron Gross (chiefninjaofficer@gmail.com, +972-52-6558841)

# Potential P.R venues / Storythons

* http://tisch.nyu.edu/itp

# OKRs for March 31 2017
* Launch Alpha
** Deployed server that anyone can play on
* Produce 3 decent stories
** Each story gets 50 page views

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
