'use strict';
const $ = require('sprint-js');
import OauthButtons from './index';

describe('Directive: oauthButtons', function() {

  // load the directive's module and view
  beforeEach(angular.mock.module(OauthButtons));
  // beforeEach(angular.mock.module('components/oauth-buttons/oauth-buttons.html'));

  var element, parentScope, elementScope;

  var compileDirective = function(template) {
    inject(function($compile) {
      element = angular.element(template);
      element = $compile(element)(parentScope);
      parentScope.$digest();
      elementScope = element.isolateScope();
    });
  };

  beforeEach(inject(function($rootScope) {
    parentScope = $rootScope.$new();
  }));

  it('should contain anchor buttons', function() {
    compileDirective('<oauth-buttons></oauth-buttons>');
    expect($(element[0]).find('a.btn.btn-social').length).to.be.at.least(1);
  });

  it('should evaluate and bind the classes attribute to scope.classes', function() {
    parentScope.scopedClass = 'scopedClass1';
    compileDirective('<oauth-buttons classes="testClass1 {{scopedClass}}"></oauth-buttons>');
    expect(elementScope.classes).to.equal('testClass1 scopedClass1');
  });

  it('should bind scope.classes to class names on the anchor buttons', function() {
    compileDirective('<oauth-buttons></oauth-buttons>');
    // Add classes
    elementScope.classes = 'testClass1 testClass2';
    elementScope.$digest();
    expect($(element[0]).find('a.btn.btn-social.testClass1.testClass2').length).to.be.at.least(1);

    // Remove classes
    elementScope.classes = '';
    elementScope.$digest();
    expect($(element[0]).find('a.btn.btn-social.testClass1.testClass2').length).to.equal(0);
  });
});
