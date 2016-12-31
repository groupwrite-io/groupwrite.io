'use strict';
/*eslint-env node*/
var testsContext;

require('babel-polyfill');
require('angular');
require('angular-mocks');
require('./client/components/ui-router/ui-router.mock');
require('./client/components/socket/socket.mock');

testsContext = require.context('./client', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
