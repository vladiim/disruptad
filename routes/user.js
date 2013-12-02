(function() {
  var User, root;

  User = (function() {
    function User(id, queuePosition) {
      this.id = id;
      this.queuePosition = queuePosition;
    }

    return User;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.User = User;

}).call(this);
