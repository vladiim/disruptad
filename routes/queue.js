(function() {
  var Queue, root;

  Queue = (function() {
    var instance;

    function Queue() {}

    instance = null;

    Queue.one = {
      name: 'one',
      'members': []
    };

    Queue.two = {
      name: 'two',
      'members': []
    };

    Queue.three = {
      name: 'three',
      'members': []
    };

    Queue.four = {
      name: 'four',
      'members': []
    };

    Queue.queues = [Queue.one, Queue.two, Queue.three, Queue.four];

    Queue.add = function(user_id) {
      var queue, _i, _len, _ref, _results;
      _ref = this.queues;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        queue = _ref[_i];
        _results.push(this.addToQueue(queue, user_id));
      }
      return _results;
    };

    Queue.addToQueue = function(queue, user_id) {
      var member, position;
      position = queue['members'].length + 1;
      member = {
        position: position,
        user_id: user_id
      };
      return queue['members'].push(member);
    };

    Queue.remove = function(user_id) {
      var queue, _i, _len, _ref, _results;
      _ref = this.queues;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        queue = _ref[_i];
        _results.push(this.removeFromQueue(queue, user_id));
      }
      return _results;
    };

    Queue.removeFromQueue = function(queue, user_id) {
      switch (queue['name']) {
        case 'one':
          return this.one['members'] = [];
        case 'two':
          return this.two['members'] = [];
        case 'three':
          return this.three['members'] = [];
        case 'four':
          return this.four['members'] = [];
      }
    };

    return Queue;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Queue = Queue;

}).call(this);
