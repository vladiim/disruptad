window.onload = ->
  socket = io.connect('http://localhost:3000')
  # @socketId = socket.id --- this doesn't work

  disrupt   = $('#disrupt-message')

  findMe = (users) ->
    uniqueId = 1
    for user in users
      return user if user.id is uniqueId

  socket.on 'user created', (data) ->
    user  = JSON.parse(data.user)
    users = JSON.parse(data.users)
    me    = findMe(users)
    html  = "<p>Position: #{user.queuePosition} and my position: #{me.queuePosition}</p>"
    disrupt.innerHTML = html