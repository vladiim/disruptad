(function() {
  window.onload = function() {
    var disrupt, findMe, myId, socket;
    socket = io.connect('http://localhost:3000');
    disrupt = $('#disrupt-message');
    myId = function() {
      console.log("cookie: " + document.cookie['disruptad-holler-userId']);
      return document.cookie['disruptad-holler-userId'];
    };
    findMe = function(users) {
      var user, _i, _len;
      for (_i = 0, _len = users.length; _i < _len; _i++) {
        user = users[_i];
        if (user.id === myId()) {
          return user;
        }
      }
    };
    return socket.on('user created', function(data) {
      var html, me, one, user;
      user = JSON.parse(data.user);
      one = JSON.parse(data.one);
      me = findMe(data.users);
      html = "<p>Position one: " + one['members'].position + ", me: " + me + "</p>";
      return disrupt.html(html);
    });
  };

}).call(this);
