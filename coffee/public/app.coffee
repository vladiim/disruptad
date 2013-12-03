window.onload = ->
  socket  = io.connect('http://localhost:3000')
  disrupt = $('#disrupt-message')

  findMe = (users, myId) ->
    for user in users
      return user if user.id is myId

  socket.on 'user created', (data) ->
    user  = JSON.parse(data.user)
    one   = JSON.parse(data.one)
    me    = findMe(data.users, data.myId)
    html  = "<p>Position one: #{one.position}, me: #{me}</p>"
    disrupt.html(html)