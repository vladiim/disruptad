/* ********************************************************************
MODULE DEPENDENCIES
*/


(function() {
  var COOKIE_SECRET, Cookies, Queue, User, UserList, app, environment, express, http, io, path, randomId, root, routes, server, socket;

  express = require("express");

  routes = require("./routes");

  http = require("http");

  Cookies = require("cookies");

  path = require("path");

  socket = require("socket.io");

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  app = express();

  User = require('./routes/user').User;

  UserList = require('./routes/user_list').UserList;

  Queue = require('./routes/queue').Queue;

  Queue = require('./routes/queue').Queue;

  COOKIE_SECRET = "CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9";

  /* ********************************************************************
  HELPERS
  */


  randomId = function() {
    return Math.floor(Math.random() * (1000000000 - 1000000 + 1) + 1000000);
  };

  /* ********************************************************************
  MIDDLEWARE
  */


  app.set("port", process.env.PORT || 3000);

  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "jade");

  app.use(express.favicon());

  app.use(express.logger("dev"));

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.methodOverride());

  app.use(function(req, res, next) {
    var cookie, cookies, id;
    cookies = new Cookies(req, res);
    cookie = cookies.get('disruptad-holler-userId');
    if (!cookie) {
      id = randomId();
      cookies.set('disruptad-holler-userId', id, {
        httpOnly: false
      });
      app.set('userId', id);
    } else {
      app.set('userId', cookie);
    }
    return next();
  });

  app.use(express.cookieParser(COOKIE_SECRET));

  app.use(express.session());

  app.use(app.router);

  app.use(express["static"](path.join(__dirname, "public")));

  /* ********************************************************************
  DEVELOPMENT ENVIRONMENT SETTINGS
  */


  environment = app.get("env");

  if (environment === "development") {
    app.use(express.errorHandler());
    app.set('userId', randomId());
  }

  /* ********************************************************************
  CREATE SERVER
  */


  server = http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

  io = socket.listen(server);

  /* ********************************************************************
  Routes
  */


  app.get("/", routes.index);

  /* ********************************************************************
  EVENT HANDLERS
  */


  io.sockets.on("connection", function(socket) {
    var myId, user;
    myId = app.get('userId');
    user = new User(myId);
    UserList.add(user);
    Queue.add(user.id);
    return io.sockets.emit('user created', {
      user: JSON.stringify(user),
      users: JSON.stringify(UserList.users),
      one: JSON.stringify(Queue.one),
      two: JSON.stringify(Queue.two),
      three: JSON.stringify(Queue.three),
      four: JSON.stringify(Queue.four)
    });
  });

  /* ********************************************************************
  EXPORTS
  */


  root.server = server;

}).call(this);
