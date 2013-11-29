(function() {
  var UserList, root;

  UserList = (function() {
    function UserList() {}

    if (UserList.users == null) {
      UserList.users = [];
    }

    UserList.add = function(user) {
      return this.users.push(user);
    };

    return UserList;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.UserList = UserList;

}).call(this);
