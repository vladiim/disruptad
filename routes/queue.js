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

    Queue.add = function(user) {
      var id, member, queue, _i, _len, _ref, _results;
      id = user.id;
      member = {
        position: 1,
        user_id: id
      };
      _ref = this.queues;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        queue = _ref[_i];
        _results.push(queue['members'].push(member));
      }
      return _results;
    };

    Queue.remove = function(user) {
      var id, queue, _i, _len, _ref, _results;
      id = user.id;
      _ref = this.queues;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        queue = _ref[_i];
        _results.push(this.removeFromQueue(queue, id));
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
