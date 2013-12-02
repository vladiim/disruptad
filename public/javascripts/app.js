(function() {
  window.onload = function() {
    var disrupt, findMe, socket;
    socket = io.connect('http://localhost:3000');
    disrupt = $('#disrupt-message');
    findMe = function(users, myId) {
      var user, _i, _len;
      for (_i = 0, _len = users.length; _i < _len; _i++) {
        user = users[_i];
        if (user.id === myId) {
          return user;
        }
      }
    };
    return socket.on('user created', function(data) {
      var html, me, user, users;
      user = JSON.parse(data.user);
      users = JSON.parse(data.users, data.myId);
      me = findMe(users);
      html = "<p>Position: " + user.queuePosition + " and my position: " + me.queuePosition + "</p>";
      return disrupt.html(html);
    });
  };

}).call(this);
