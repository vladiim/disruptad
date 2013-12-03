findUserIdCookie = (cookie, cookies) ->
  split_cookie = cookie.split('=')
  key = split_cookie[0]
  value = split_cookie[1]
  return parseInt(value) if key is 'disruptad-holler-userId'

myId = (document) ->
  cookies = document.cookie.split('; ')
  for cookie in cookies
    return findUserIdCookie(cookie, cookies)

findMe = (users) ->
  for user in users
    return user if user.id is myId(document)

if !window then window = {} # for testing purposes

window.onload = ->
  socket  = io.connect('http://localhost:3000')
  disrupt = $('#disrupt-message')

  socket.on 'user created', (data) ->
    console.log("myid: #{myId()}")
    user  = JSON.parse(data.user)
    one   = JSON.parse(data.one)
    me    = findMe(data.users)
    html  = "<p>Position one: #{one['members'].position}, me: #{me}</p>"
    disrupt.html(html)

root = exports ? window
root.myId = myId