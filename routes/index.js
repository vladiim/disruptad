(function() {
  var UserList, index, root;

  UserList = require('./user_list').UserList;

  index = function(req, res) {
    return res.render("index", {
      title: "Disrupt xmas"
    });
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.index = index;

}).call(this);
