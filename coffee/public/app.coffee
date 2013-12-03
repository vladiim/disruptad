# for testing purposes
# if !window then window = {}

HOLLER_COOKIE = 'disruptad-holler-userId'

myId = ->
  cookies = document.cookie.split('; ')
  for cookie in cookies
    split_cookie = cookie.split('=')
    key          = split_cookie[0]
    value        = split_cookie[1]
    return parseInt(value) if key is HOLLER_COOKIE

findMe = (users) ->
  myId = myId()
  for user in users
    return user if user.id is myId

window.onload = ->
  socket  = io.connect('http://localhost:3000')
  disrupt = $('#disrupt-message')

  socket.on 'user created', (data) ->
    console.log("myid: #{myId()}")
    user  = JSON.parse(data.user)
    users = JSON.parse(data.users)
    one   = JSON.parse(data.one)
    me    = findMe(users)
    html  = "<p>Position one: #{one['members'].position}, me: #{me}</p>"
    disrupt.html(html)

root = exports ? window
root.myId = myId