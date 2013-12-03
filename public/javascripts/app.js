(function() {
  var findMe, findUserIdCookie, myId, root, window;

  findUserIdCookie = function(cookie, cookies) {
    var key, split_cookie, value;
    split_cookie = cookie.split('=');
    key = split_cookie[0];
    value = split_cookie[1];
    if (key === 'disruptad-holler-userId') {
      return parseInt(value);
    }
  };

  myId = function(document) {
    var cookie, cookies, _i, _len;
    cookies = document.cookie.split('; ');
    for (_i = 0, _len = cookies.length; _i < _len; _i++) {
      cookie = cookies[_i];
      return findUserIdCookie(cookie, cookies);
    }
  };

  findMe = function(users) {
    var user, _i, _len;
    for (_i = 0, _len = users.length; _i < _len; _i++) {
      user = users[_i];
      if (user.id === myId(document)) {
        return user;
      }
    }
  };

  if (!window) {
    window = {};
  }

  window.onload = function() {
    var disrupt, socket;
    socket = io.connect('http://localhost:3000');
    disrupt = $('#disrupt-message');
    return socket.on('user created', function(data) {
      var html, me, one, user;
      console.log("myid: " + (myId()));
      user = JSON.parse(data.user);
      one = JSON.parse(data.one);
      me = findMe(data.users);
      html = "<p>Position one: " + one['members'].position + ", me: " + me + "</p>";
      return disrupt.html(html);
    });
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.myId = myId;

}).call(this);
