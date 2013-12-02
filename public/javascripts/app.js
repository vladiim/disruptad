(function() {
  window.onload = function() {
    var disrupt, socket;
    socket = io.connect('http://localhost:3000');
    disrupt = $('#disrupt-message');
    return socket.on('user created', function(data) {
      var html, user, users;
      user = JSON.parse(data.user);
      users = JSON.parse(data.users);
      html = "<p>Position: " + user.queuePosition + " and ";
      return disrupt.innerHTML = html;
    });
  };

}).call(this);
