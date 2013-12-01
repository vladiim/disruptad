(function() {
  var expect, io, options, socketURL;

  expect = require('chai').expect;

  io = require('socket.io-client');

  socketURL = 'http://localhost:3000';

  options = {
    transports: ['websocket'],
    'force new connection': true
  };

  describe("App", function() {
    return describe("on client connection", function() {
      var testClientConnection;
      testClientConnection = function(expectation, done) {
        var client;
        client = io.connect(socketURL, options);
        return client.on('connect', function(data) {
          return client.on('user created', function(user) {
            expectation(user);
            client.disconnect();
            return done();
          });
        });
      };
      return it("sets the client up as a user", function(done) {
        var expectation;
        expectation = function(user) {
          return expect(user).to.be;
        };
        return testClientConnection(expectation, done);
      });
    });
  });

}).call(this);
