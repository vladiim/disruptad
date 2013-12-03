(function() {
  var EMPTY_FOUR, EMPTY_ONE, EMPTY_THREE, EMPTY_TWO, FIRST_USER, Queue, USER_ID, expect, expectAllQueuesEmpty, expectOneUserInQueues;

  expect = require('chai').expect;

  Queue = require('../../routes/queue').Queue;

  USER_ID = 123;

  FIRST_USER = {
    position: 1,
    user_id: USER_ID
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
        _results.push(queue = []);
      }
      return _results;
    });
    return describe('add(user)', function() {
      beforeEach(function() {
        this.user = {
          id: USER_ID
        };
        return Queue.add(this.user);
      });
      describe('no one on any queue', function() {
        return it('adds the user as the first person on each queue', function() {
          return expectOneUserInQueues();
        });
      });
      return describe('remove(user)', function() {
        return describe('only one user', function() {
          return it('empties the queues', function() {
            Queue.remove(this.user);
            return expectAllQueuesEmpty();
          });
        });
      });
    });
  });

}).call(this);
