/* ********************************************************************
Module dependencies
*/


(function() {
  var app, clients, environment, express, http, io, path, root, routes, server, socket;

  express = require("express");

  routes = require("./routes");

  http = require("http");

  path = require("path");

  socket = require("socket.io");

  clients = {};

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  app = express();

  /* ********************************************************************
  App configurations
  */


  app.set("port", process.env.PORT || 3000);

  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "jade");

  app.use(express.favicon());

  app.use(express.logger("dev"));

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.methodOverride());

  app.use(express.cookieParser("your secret here"));

  app.use(express.session());

  app.use(app.router);

  app.use(express["static"](path.join(__dirname, "public")));

  /* ********************************************************************
  Development environment settings
  */


  environment = app.get("env");

  if (environment === "development") {
    app.use(express.errorHandler());
  }

  /* ********************************************************************
  Create server
  */


  server = http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

  io = socket.listen(server);

  /* ********************************************************************
  Exports
  */


  root.server = server;

  root.clients = clients;

  /* ********************************************************************
  Routes
  */


  app.get("/", routes.index);

  /* ********************************************************************
  Event handlers
  */


  io.sockets.on("connection", function(socket) {
    return server.clients.push({
      "client": 'bob'
    });
  });

}).call(this);
