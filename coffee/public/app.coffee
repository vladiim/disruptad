window.onload = ->
  socket  = io.connect('http://localhost:3000')
  disrupt = $('#disrupt-message')

  socket.on 'user created', (data) ->
    user = JSON.parse(data.user)
    users = JSON.parse(data.users)
    html = "<p>Position: #{user.queuePosition} and "
    disrupt.innerHTML = html