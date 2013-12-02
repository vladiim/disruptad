class UserList
	instance = null

  @test = 223

  @users ?= []

  @add: (user) ->
  	@users.push(user)

root = exports ? window
root.UserList = UserList