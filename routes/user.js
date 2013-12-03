(function() {
  var User, root;

  User = (function() {
    function User(id) {
      this.id = id;
    }

    return User;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.User = User;

}).call(this);
