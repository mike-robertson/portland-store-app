'use strict';

describe('Directive: stickToTop', function () {

  // load the directive's module
  beforeEach(module('portlandStoreApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stick-to-top></stick-to-top>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stickToTop directive');
  }));
});