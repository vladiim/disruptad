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
# { UserList } = require('./routes/user_list')
{ Queue }    = require('./routes/queue')
{ Queue }    = require('./routes/queue')

COOKIE_SECRET = "CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9CXtgEF1E0kIAt9"

### ********************************************************************
HELPER CLASS
###

class DisruptAd
  constructor: (@app) ->

  createUser: ->
    @myId = @app.get('userId')
    @user = new User(@myId)
    Queue.add(@user)

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
  cookie  = cookies.get('disruptad-holler')
  if !cookie
    id = Math.floor(Math.random() * (1000000000 - 1000000 + 1) + 1000000)
    cookies.set('disruptad-holler-userId', id)
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
# app.get "users", UserList.users

### ********************************************************************
EVENT HANDLERS
###
io.sockets.on "connection", (socket) ->
  disruptad = new DisruptAd(app)
  disruptad.createUser()

  io.sockets.emit 'user created',
    user:  JSON.stringify(disruptad.user)
    one:   JSON.stringify(Queue.one)
    two:   JSON.stringify(Queue.two)
    three: JSON.stringify(Queue.three)
    four:  JSON.stringify(Queue.four)
    myId:  disruptad.myId

### ********************************************************************
EXPORTS
###
root.server    = server
root.DisruptAd = DisruptAd
root.Queue     = Queue