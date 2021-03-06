### ********************************************************************
MODULE DEPENDENCIES
###
express = require("express")
routes  = require("./routes")
http    = require("http")
Cookies = require("cookies")
path    = require("path")
socket  = require("socket.io")
root    = exports ? window
app     = express()

{ User }     = require('./routes/user')
{ UserList } = require('./routes/user_list')
{ Queue }    = require('./routes/queue')
{ Queue }    = require('./routes/queue')

COOKIE_SECRET = "CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9"

### ********************************************************************
HELPERS
###

randomId = -> Math.floor(Math.random() * (1000000000 - 1000000 + 1) + 1000000)

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

app.use (req, res, next) ->
  cookies = new Cookies(req, res)
  cookie  = cookies.get('disruptad-holler-userId')
  if !cookie
    id = randomId()
    cookies.set('disruptad-holler-userId', id, { httpOnly: false } )
    app.set('userId', id)
  else
    app.set('userId', cookie)
  next()

app.use express.cookieParser(COOKIE_SECRET)
app.use express.session()
app.use app.router

app.use express.static(path.join(__dirname, "public"))

### ********************************************************************
DEVELOPMENT ENVIRONMENT SETTINGS
###
environment = app.get("env")

if environment is "development"
  app.use(express.errorHandler())
  app.set('userId', randomId())

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
# app.get "users", UserList.users

### ********************************************************************
EVENT HANDLERS
###
io.sockets.on "connection", (socket) ->
  myId = app.get('userId')
  user = new User(myId)
  UserList.add(user)
  Queue.add(user.id)

  io.sockets.emit 'user created',
    user:  JSON.stringify(user)
    users: JSON.stringify(UserList.users)
    one:   JSON.stringify(Queue.one)
    two:   JSON.stringify(Queue.two)
    three: JSON.stringify(Queue.three)
    four:  JSON.stringify(Queue.four)

### ********************************************************************
EXPORTS
###
root.server = server