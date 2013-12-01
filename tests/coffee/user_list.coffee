{ expect }   = require('chai')
{ UserList } = require('../../routes/user_list')

describe "UserList", ->

	describe "#add", ->
    addUser = ->
      user = new Object
      UserList.add(user)
      user

    it "stores the user in users", ->
      user = addUser()
      expect(UserList.users).to.include(user)