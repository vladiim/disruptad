(function() {
  var User, expect;

  expect = require('chai').expect;

  User = require('../../routes/user').User;

  describe('User', function() {
    beforeEach(function() {
      return this.user = new User;
    });
    return it('creates a uid for the user', function() {
      return expect(this.user.uid).to.exist;
    });
  });

}).call(this);
