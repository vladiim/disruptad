### ********************************************************************
Module dependencies
###
express = require("express")

routes  = require("./routes")

http    = require("http")
path    = require("path")
socket  = require("socket.io")

clients = {}
root    = exports ? window
app     = express()

### ********************************************************************
App configurations
###
app.set "port", process.env.PORT or 3000
app.set "views", path.join(__dirname, "views")
app.set "view engine", "jade"
app.use express.favicon()
app.use express.logger("dev")
app.use express.json()
app.use express.urlencoded()
app.use express.methodOverride()
app.use express.cookieParser("your secret here")
app.use express.session()
app.use app.router
app.use express.static(path.join(__dirname, "public"))

### ********************************************************************
Development environment settings
###
environment = app.get("env")
app.use(express.errorHandler()) if environment is "development"

### ********************************************************************
Create server
###
server = http.createServer(app).listen(app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")
)

io = socket.listen(server)

### ********************************************************************
Routes
###
app.get "/", routes.index

### ********************************************************************
Event handlers
###
io.sockets.on "connection", (socket) ->
  console.log 'made connection'
  # clients.push( { "client": 'bob' } )

  socket.on 'connection name', (user) ->
    io.sockets.emit "new user", "#{user.name} has joined."

### ********************************************************************
Exports
###
root.server  = server
root.clients = clients