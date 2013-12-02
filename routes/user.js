(function() {
  var User, root;

  User = (function() {
    function User(socketId, queuePosition) {
      this.socketId = socketId;
      this.queuePosition = queuePosition;
    }

    return User;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.User = User;

}).call(this);
