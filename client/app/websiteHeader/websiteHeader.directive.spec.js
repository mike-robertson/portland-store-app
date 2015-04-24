'use strict';

describe('Directive: websiteHeader', function () {

  // load the directive's module and view
  beforeEach(module('portlandStoreApp'));
  beforeEach(module('app/websiteHeader/websiteHeader.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<website-header></website-header>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the websiteHeader directive');
  }));
});