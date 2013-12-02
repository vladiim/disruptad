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
      return describe('user created', function() {
        var testClientConnection;
        testClientConnection = function(expectation, done) {
          var client;
          client = io.connect(socketURL, options);
          return client.on('connect', function(data) {
            return client.on('user created', function(data) {
              expectation(data);
              client.disconnect();
              return done();
            });
          });
        };
        it("sets the client up as a user", function(done) {
          var expectation;
          expectation = function(data) {
            return expect(data.user).to.be;
          };
          return testClientConnection(expectation, done);
        });
        return it("adds the user to the user list", function(done) {
          var expectation;
          expectation = function(data) {
            return expect(data.users).to.include(data.user);
          };
          return testClientConnection(expectation, done);
        });
      });
    });
  });

}).call(this);
