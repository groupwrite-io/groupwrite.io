'use strict';
const angular = require('angular');

export default angular.module('writingIoApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
