(function() {
  var UserList, expect;

  expect = require('chai').expect;

  UserList = require('../../routes/user_list').UserList;

  describe("UserList", function() {
    return describe("#add", function() {
      var addUser;
      addUser = function() {
        var user;
        user = new Object;
        UserList.add(user);
        return user;
      };
      return it("stores the user in users", function() {
        var user;
        user = addUser();
        return expect(UserList.users).to.include(user);
      });
    });
  });

}).call(this);
