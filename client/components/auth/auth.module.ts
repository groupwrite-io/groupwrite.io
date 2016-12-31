'use strict';
const angular = require('angular');
import constants from '../../app/app.constants';
import util from '../util/util.module';
const ngCookies = require('angular-cookies');
import {authInterceptor} from './interceptor.service';
import {routerDecorator} from './router.decorator';
import {AuthService} from './auth.service';
import {UserResource} from './user.service';

const uiRouter = require('angular-ui-router');

function addInterceptor($httpProvider) {
  'ngInject';
  $httpProvider.interceptors.push('authInterceptor');
}

export default angular.module('writingIoApp.auth', [
  constants,
  util,
  ngCookies,
  uiRouter
])
  .factory('authInterceptor', authInterceptor)
  .run(routerDecorator)
  .factory('Auth', AuthService)
  .factory('User', UserResource)
  .config(['$httpProvider', addInterceptor])
  .name;
