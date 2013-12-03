(function() {
  var HOLLER_COOKIE, findMe, myId, root;

  HOLLER_COOKIE = 'disruptad-holler-userId';

  myId = function() {
    var cookie, cookies, key, split_cookie, value, _i, _len;
    cookies = document.cookie.split('; ');
    for (_i = 0, _len = cookies.length; _i < _len; _i++) {
      cookie = cookies[_i];
      split_cookie = cookie.split('=');
      key = split_cookie[0];
      value = split_cookie[1];
      if (key === HOLLER_COOKIE) {
        return parseInt(value);
      }
    }
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

  window.onload = function() {
    var disrupt, socket;
    socket = io.connect('http://localhost:3000');
    disrupt = $('#disrupt-message');
    return socket.on('user created', function(data) {
      var html, me, one, user, users;
      console.log("myid: " + (myId()));
      user = JSON.parse(data.user);
      users = JSON.parse(data.users);
      one = JSON.parse(data.one);
      me = findMe(users);
      html = "<p>Position one: " + one['members'].position + ", me: " + me + "</p>";
      return disrupt.html(html);
    });
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.myId = myId;

}).call(this);
