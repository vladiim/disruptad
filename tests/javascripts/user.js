(function() {
  var User, expect;

  expect = require('chai').expect;

  User = require('../../routes/user').User;

  describe('User', function() {
    beforeEach(function() {
      return this.user = new User(123);
    });
    return it('sets the users id', function() {
      return expect(this.user.id).to.eql(123);
    });
  });

}).call(this);
