(function() {
  var expect, routes;

  expect = require('chai').expect;

  routes = require('../../routes');

  describe('Routes', function() {
    return it('defines the index route', function() {
      return expect(routes.index).to.exist;
    });
  });

}).call(this);
