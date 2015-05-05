'use strict';

describe('Directive: creditCardPayment', function () {

  // load the directive's module and view
  beforeEach(module('portlandStoreApp'));
  beforeEach(module('app/creditCardPayment/creditCardPayment.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<credit-card-payment></credit-card-payment>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the creditCardPayment directive');
  }));
});