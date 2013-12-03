window.onload = ->
  socket  = io.connect('http://localhost:3000')
  disrupt = $('#disrupt-message')

  myId = ->
    console.log("cookie: #{document.cookie['disruptad-holler-userId']}")
    document.cookie['disruptad-holler-userId']

  findMe = (users) ->
    for user in users
      return user if user.id is myId()

  socket.on 'user created', (data) ->
    user  = JSON.parse(data.user)
    one   = JSON.parse(data.one)
    me    = findMe(data.users)
    html  = "<p>Position one: #{one['members'].position}, me: #{me}</p>"
    disrupt.html(html)