class User
  constructor: (socketId, queuePosition) ->
    @uid           = @createUid()
    @queuePosition = queuePosition
    @socketId      = socketId

  createUid: ->
    randomNumber = Math.random().toString()
    randomNumber = randomNumber.substring(2, randomNumber.length)

root = exports ? window  
root.User = User