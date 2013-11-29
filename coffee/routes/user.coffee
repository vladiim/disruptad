class User
  constructor: ->
    @uid = @createUid()

  createUid: ->
    randomNumber = Math.random().toString()
    randomNumber = randomNumber.substring(2, randomNumber.length)

root = exports ? window  
root.User = User