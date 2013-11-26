(function() {
  var User, root;

  User = (function() {
    function User(name) {
      this.name = name;
    }

    return User;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.User = User;

}).call(this);
