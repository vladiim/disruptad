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
    return describe('@queuePosition', function() {
      describe('no users in the user list', function() {
        return it('is #1 in the queue', function() {
          return expect(this.user.queuePosition).to.eql(1);
        });
      });
      return describe('>0 users in the user list', function() {
        return it('n+1 in the queue', function() {
          var position, positions, testPositions, _i, _len;
          positions = [1, 5, 10, 43];
          for (_i = 0, _len = positions.length; _i < _len; _i++) {
            position = positions[_i];
            testPositions;
          }
          return testPositions = function(position) {
            var user;
            return user = expect();
          };
        });
      });
    });
  });

}).call(this);
