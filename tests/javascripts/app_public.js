(function() {
  var expect, myId;

  expect = require('chai').expect;

  myId = require('../../public/javascripts/app').myId;

  describe('window.onload', function() {
    beforeEach(function() {
      var window;
      window = {
        onload: function() {}
      };
      return window.onload();
    });
    return describe('myId()', function() {
      return describe('users cookie is set', function() {
        return it('finds the users id based on their cookie', function() {
          var document;
          document = {
            cookie: "blah=lol; disruptad-holler-userId=1"
          };
          return expect(myId(document)).to.eql(1);
        });
      });
    });
  });

}).call(this);
