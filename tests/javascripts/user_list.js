(function() {
  var UserList, expect;

  expect = require('chai').expect;

  UserList = require('../../routes/user_list').UserList;

  describe("UserList", function() {
    return describe("#add", function() {
      return it("stores the user to all users", function() {
        var user;
        user = new Object;
        UserList.add(user);
        return expect(UserList.users).to.include(user);
      });
    });
  });

}).call(this);
