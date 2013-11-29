{ expect }   = require('chai')
{ UserList } = require('../../routes/user_list')

describe "UserList", ->

	describe "#add", ->
    it "stores the user to all users", ->
      user = new Object
      UserList.add(user)
      expect(UserList.users).to.include(user)