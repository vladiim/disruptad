window.onload = ->
  socket  = io.connect('http://localhost:3000')
  disrupt = $('#disrupt-message')

  findMe = (users, myId) ->
    for user in users
      return user if user.id is myId

  socket.on 'user created', (data) ->
    user  = JSON.parse(data.user)
    users = JSON.parse(data.users, data.myId)
    me    = findMe(users)
    html  = "<p>Position: #{user.queuePosition} and my position: #{me.queuePosition}</p>"
    disrupt.html(html)