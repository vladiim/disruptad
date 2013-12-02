class User
  constructor: (@socketId, @queuePosition) ->

root = exports ? window  
root.User = User