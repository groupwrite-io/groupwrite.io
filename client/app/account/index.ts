'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routing from './account.routes';
import login from './login';
import settings from './settings';
import signup from './signup';
import oauthButtons from '../../components/oauth-buttons';

export default angular.module('writingIoApp.account', [

    uiRouter,
    login,
    settings,
    signup,
    oauthButtons
])
    .config(routing)

    .run(function($rootScope) {
      'ngInject';
      $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
        if (next.name === 'logout' && current && current.name && !current.authenticate) {
          next.referrer = current.name;
        }
      });
    })
    .name;
