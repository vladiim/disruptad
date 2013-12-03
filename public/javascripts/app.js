(function() {
  var ClientDocument, HOLLER_COOKIE, Ustream, findMe, myId, root;

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
    myId = myId();
    for (_i = 0, _len = users.length; _i < _len; _i++) {
      user = users[_i];
      if (user.id === myId) {
        return user;
      }
    }
  };

  ClientDocument = (function() {
    function ClientDocument() {}

    ClientDocument.introMessage = $('#intro-message');

    ClientDocument.keyStream = $('#key-stream');

    ClientDocument.disruptMessage = $('#disrupt-message');

    ClientDocument.disruptButton = "<a id='disrupt-button' href='/'>DISRUPT</a>";

    return ClientDocument;

  })();

  Ustream = (function() {
    function Ustream() {}

    Ustream.streams = ['utv16093748'];

    Ustream.stream = Ustream.streams[0];

    Ustream.type = "application/x-shockwave-flash";

    Ustream.data = "http://static-cdn1.ustream.tv/swf/live/viewer:230.swf?vrsl=c:566&ulbr=100";

    Ustream.flashvars = "autoplay=true&locale=en_SG&referrer=unknown&autoResize=false&enablejsapi=true&ts=1384150323509&cid=16093748";

    Ustream.object = "<object type='" + Ustream.type + "' data='" + Ustream.data + "' width='100%' height='100%' id='" + Ustream.stream + "' name='" + Ustream.stream + "'>";

    Ustream.param1 = "<param name='flashvars' value='" + Ustream.flashvars + "'>";

    Ustream.param2 = "<param name='allowfullscreen' value='true'>";

    Ustream.param3 = "<param name='allowscriptaccess' value='always'>";

    Ustream.param4 = "<param name='bgcolor' value='opaque'>";

    Ustream.param5 = "<param name='wmode' value='opaque'>";

    Ustream.html = function() {
      return "" + this.object + this.param1 + this.param2 + this.param3 + this.param4 + this.param5 + "</object>";
    };

    return Ustream;

  })();

  window.onload = function() {
    var socket;
    socket = io.connect('http://localhost:3000');
    return socket.on('user created', function(data) {
      var me, one, user, users;
      console.log("myid: " + (myId()));
      user = JSON.parse(data.user);
      users = JSON.parse(data.users);
      one = JSON.parse(data.one);
      me = findMe(users);
      return ClientDocument.keyStream.html(Ustream.html());
    });
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.myId = myId;

}).call(this);
