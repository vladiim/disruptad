(function() {
  var EMPTY_FOUR, EMPTY_ONE, EMPTY_THREE, EMPTY_TWO, FIRST_USER, Queue, SECOND_USER, UID, UID2, expect, expectAllQueuesEmpty, expectOneUserInQueues, expectTwoUsersInQueues;

  expect = require('chai').expect;

  Queue = require('../../routes/queue').Queue;

  UID = 123;

  UID2 = 321;

  FIRST_USER = {
    position: 1,
    user_id: UID
  };

  SECOND_USER = {
    position: 2,
    user_id: UID2
  };

  EMPTY_ONE = {
    name: 'one',
    'members': []
  };

  EMPTY_TWO = {
    name: 'two',
    'members': []
  };

  EMPTY_THREE = {
    name: 'three',
    'members': []
  };

  EMPTY_FOUR = {
    name: 'four',
    'members': []
  };

  expectAllQueuesEmpty = function() {
    expect(Queue.one).to.eql(EMPTY_ONE);
    expect(Queue.two).to.eql(EMPTY_TWO);
    expect(Queue.three).to.eql(EMPTY_THREE);
    return expect(Queue.four).to.eql(EMPTY_FOUR);
  };

  expectOneUserInQueues = function() {
    expect(Queue.one).to.eql({
      name: 'one',
      "members": [FIRST_USER]
    });
    expect(Queue.two).to.eql({
      name: 'two',
      "members": [FIRST_USER]
    });
    expect(Queue.three).to.eql({
      name: 'three',
      "members": [FIRST_USER]
    });
    return expect(Queue.four).to.eql({
      name: 'four',
      "members": [FIRST_USER]
    });
  };

  expectTwoUsersInQueues = function() {
    expect(Queue.one).to.eql({
      name: 'one',
      "members": [FIRST_USER, SECOND_USER]
    });
    expect(Queue.two).to.eql({
      name: 'two',
      "members": [FIRST_USER, SECOND_USER]
    });
    expect(Queue.three).to.eql({
      name: 'three',
      "members": [FIRST_USER, SECOND_USER]
    });
    return expect(Queue.four).to.eql({
      name: 'four',
      "members": [FIRST_USER, SECOND_USER]
    });
  };

  describe('Queue', function() {
    describe('no queues', function() {
      return it('sets up four empty queues', function() {
        return expectAllQueuesEmpty();
      });
    });
    afterEach(function() {
      var queue, _i, _len, _ref, _results;
      _ref = Queue.queues;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        queue = _ref[_i];
        _results.push(queue['members'] = []);
      }
      return _results;
    });
    describe('add(user)', function() {
      beforeEach(function() {
        return Queue.add(UID);
      });
      describe('no one on any queue', function() {
        return it('adds the user as the first person on each queue', function() {
          return expectOneUserInQueues();
        });
      });
      describe('add second user', function() {
        return describe('first user in each queue', function() {
          return it('adds the second user', function() {
            Queue.add(UID2);
            return expectTwoUsersInQueues();
          });
        });
      });
      return describe('remove(user)', function() {
        describe('only one user', function() {
          return it('empties the queues', function() {
            Queue.remove(UID);
            return expectAllQueuesEmpty();
          });
        });
        return describe('more than one user,', function() {
          return describe('remove user 2;', function() {
            return it('leaves user one', function() {
              Queue.add(UID2);
              Queue.remove(UID2);
              return expectOneUserInQueues();
            });
          });
        });
      });
    });
    return describe('removeMember()', function() {
      return describe('two members', function() {
        beforeEach(function() {
          Queue.add(UID);
          return Queue.add(UID2);
        });
        afterEach(function() {
          var queue, _i, _len, _ref, _results;
          _ref = Queue.queues;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            queue = _ref[_i];
            _results.push(queue['members'] = []);
          }
          return _results;
        });
        return describe('removeMember()', function() {
          describe('with first user', function() {
            return it('leaves user two and updates the users position', function() {
              var result, tested_fn;
              tested_fn = function() {
                return Queue.removeMember(Queue.one['members'], UID);
              };
              result = [
                {
                  position: 1,
                  user_id: UID2
                }
              ];
              return expect(tested_fn()).to.eql(result);
            });
          });
          return describe('with second user', function() {
            return it('leaves user one and does not update the users position', function() {
              var result, tested_fn;
              tested_fn = function() {
                return Queue.removeMember(Queue.one['members'], UID2);
              };
              result = [
                {
                  position: 1,
                  user_id: UID
                }
              ];
              return expect(tested_fn()).to.eql(result);
            });
          });
        });
      });
    });
  });

}).call(this);
