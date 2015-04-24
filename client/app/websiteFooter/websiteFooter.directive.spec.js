'use strict';

describe('Directive: websiteFooter', function () {

  // load the directive's module and view
  beforeEach(module('portlandStoreApp'));
  beforeEach(module('app/websiteFooter/websiteFooter.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<website-footer></website-footer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the websiteFooter directive');
  }));
});