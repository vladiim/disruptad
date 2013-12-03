{ Queue } = require('./queue')

class UserList
	instance = null

  @users ?= []

  @add: (user) ->
  	@users.push(user)

root = exports ? window
root.UserList = UserList