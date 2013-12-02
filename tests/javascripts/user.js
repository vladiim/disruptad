(function() {
  var User, expect;

  expect = require('chai').expect;

  User = require('../../routes/user').User;

  describe('User', function() {
    beforeEach(function() {
      return this.user = new User;
    });
    it('creates a uid for the user', function() {
      return expect(this.user.uid).to.exist;
    });
    it('sets the users socketId', function() {
      var user;
      user = new User(123, 321);
      return expect(user.socketId).to.eql(123);
    });
    return it('sets the users queuePosition', function() {
      var user;
      user = new User(123, 321);
      return expect(user.queuePosition).to.eql(321);
    });
  });

}).call(this);
