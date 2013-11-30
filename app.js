/* ********************************************************************
MODULE DEPENDENCIES
*/


(function() {
  var COOKIE_SECRET, User, UserList, app, environment, express, http, io, path, root, routes, server, socket;

  express = require("express");

  routes = require("./routes");

  http = require("http");

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

  /* ********************************************************************
  EVENT HANDLERS
  */


  io.sockets.on("connection", function(socket) {
    var user;
    user = new User;
    UserList.add(user);
    return io.sockets.emit('user created', user);
  });

  /* ********************************************************************
  EXPORTS
  */


  root.server = server;

}).call(this);
