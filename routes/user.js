(function() {
  var User, root;

  User = (function() {
    function User() {
      this.uid = this.createUid();
      this.queuePosition = 1;
    }

    User.prototype.createUid = function() {
      var randomNumber;
      randomNumber = Math.random().toString();
      return randomNumber = randomNumber.substring(2, randomNumber.length);
    };

    return User;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.User = User;

}).call(this);
