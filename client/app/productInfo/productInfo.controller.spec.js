'use strict';

describe('Controller: ProductInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('portlandStoreApp'));
  beforeEach(module('socketMock'));

  var ProductInfoCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/products')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    ProductInfoCtrl = $controller('ProductInfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of products to the scope', function () {
    $httpBackend.flush();
    expect(scope.products.length).toBe(4);
  });
});
