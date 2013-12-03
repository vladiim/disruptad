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
          return this.one['members'] = this.removeFromMembers(this.one['members'], user_id);
        case 'two':
          return this.two['members'] = this.removeFromMembers(this.two['members'], user_id);
        case 'three':
          return this.three['members'] = this.removeFromMembers(this.three['members'], user_id);
        case 'four':
          return this.four['members'] = this.removeFromMembers(this.four['members'], user_id);
      }
    };

    Queue.removeFromMembers = function(members, user_id) {
      var member, _i, _len;
      for (_i = 0, _len = members.length; _i < _len; _i++) {
        member = members[_i];
        if (this.memberIsUser(member, user_id)) {
          return this.removeMember(members, member, user_id);
        }
      }
    };

    Queue.removeMember = function(members, member, user_id) {
      var deleted_member, index;
      index = members.indexOf(member);
      deleted_member = members[index];
      members.splice(index, 1);
      this.updateMemberPositions(members, member, deleted_member);
      return members;
    };

    Queue.updateMemberPositions = function(members, member, deleted_member) {
      var updated_index, updated_member, updated_position, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = members.length; _i < _len; _i++) {
        updated_member = members[_i];
        updated_index = members.indexOf(updated_member);
        updated_position = members[updated_index]['position'] - 1;
        if (updated_position >= deleted_member['position']) {
          _results.push(members[updated_index]['position'] = updated_position);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Queue.memberIsUser = function(member, user_id) {
      return member['user_id'] === user_id;
    };

    return Queue;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Queue = Queue;

}).call(this);
