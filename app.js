/* ********************************************************************
MODULE DEPENDENCIES
*/


(function() {
  var COOKIE_SECRET, Cookies, DisruptAd, User, UserList, app, environment, express, http, io, path, root, routes, server, socket;

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
  HELPER CLASS
  */


  DisruptAd = (function() {
    function DisruptAd(UserList, app) {
      this.UserList = UserList;
      this.app = app;
    }

    DisruptAd.prototype.createUser = function() {
      this.queuePosition = this.UserList.users.length + 1;
      this.myId = this.app.get('userId');
      this.user = new User(this.myId, this.queuePosition);
      return this.UserList.add(this.user);
    };

    return DisruptAd;

  })();

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
      id = Math.floor(Math.random() * (1000000000 - 1000000 + 1) + 1000000);
      cookies.set('disruptad-holler-userId', id);
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
    var disruptad;
    disruptad = new DisruptAd(UserList, app);
    disruptad.createUser();
    return io.sockets.emit('user created', {
      user: JSON.stringify(disruptad.user),
      users: JSON.stringify(UserList.users),
      myId: disruptad.myId
    });
  });

  /* ********************************************************************
  EXPORTS
  */


  root.server = server;

  root.DisruptAd = DisruptAd;

}).call(this);
