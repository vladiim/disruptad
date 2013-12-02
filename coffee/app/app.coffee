### ********************************************************************
MODULE DEPENDENCIES
###
express = require("express")
routes  = require("./routes")
http    = require("http")
path    = require("path")
socket  = require("socket.io")
root    = exports ? window
app     = express()

{ User }     = require('./routes/user')
{ UserList } = require('./routes/user_list')

COOKIE_SECRET = "CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9"

### ********************************************************************
MIDDLEWARE
###
app.set "port", process.env.PORT or 3000
app.set "views", path.join(__dirname, "views")
app.set "view engine", "jade"
app.use express.favicon()
app.use express.logger("dev")
app.use express.json()
app.use express.urlencoded()
app.use express.methodOverride()

app.use express.cookieParser(COOKIE_SECRET)
app.use express.session()
app.use app.router

app.use express.static(path.join(__dirname, "public"))

### ********************************************************************
DEVELOPMENT ENVIRONMENT SETTINGS
###
environment = app.get("env")
app.use(express.errorHandler()) if environment is "development"

### ********************************************************************
CREATE SERVER
###
server = http.createServer(app).listen(app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")
)

io = socket.listen(server)

### ********************************************************************
Routes
###
app.get "/",     routes.index
app.get "users", UserList.users

### ********************************************************************
EVENT HANDLERS
###
io.sockets.on "connection", (socket) ->
  user = new User
  UserList.add(user)

  io.sockets.emit 'user created', user

### ********************************************************************
EXPORTS
###
root.server   = server