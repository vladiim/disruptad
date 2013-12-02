/* ********************************************************************
MODULE DEPENDENCIES
*/


(function() {
  var COOKIE_SECRET, Cookies, User, UserList, app, environment, express, http, io, path, root, routes, server, socket;

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

  COOKIE_SECRET = "CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9";

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
    cookie = cookies.get('disruptad-holler');
    if (!cookie) {
      id = Math.floor(Math.random() * (1000000000 - 100000000 + 1) + 100000000);
      cookies.set('disruptad-holler', id);
    }
    app.set('userId', cookie);
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

  app.get("users", UserList.users);

  /* ********************************************************************
  EVENT HANDLERS
  */


  io.sockets.on("connection", function(socket) {
    var id, queuePosition, user;
    queuePosition = UserList.users.length + 1;
    id = app.get('userId');
    console.log("USER----ID---- " + id);
    user = new User(id, queuePosition);
    UserList.add(user);
    return io.sockets.emit('user created', {
      user: JSON.stringify(user),
      users: JSON.stringify(UserList.users)
    });
  });

  /* ********************************************************************
  EXPORTS
  */


  root.server = server;

}).call(this);
