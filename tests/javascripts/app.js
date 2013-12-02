(function() {
  var DisruptAd, expect, io, options, sinon, socketURL;

  expect = require('chai').expect;

  sinon = require('sinon');

  io = require('socket.io-client');

  socketURL = 'http://localhost:3000';

  DisruptAd = require('../../app').DisruptAd;

  options = {
    transports: ['websocket'],
    'force new connection': true
  };

  describe("App", function() {
    return describe('DisruptAd', function() {
      return describe('#createUser', function() {
        var testDisruptAdCreateUser;
        testDisruptAdCreateUser = function(expectation, done) {
          var client;
          client = io.connect(socketURL, options);
          return client.on('connect', function(data) {
            var UserList, app, disruptad;
            UserList = {
              users: [1, 2, 3],
              add: function() {}
            };
            app = {
              get: function(arg) {
                return 'myId';
              }
            };
            disruptad = new DisruptAd(UserList, app);
            disruptad.createUser();
            expectation(disruptad);
            client.disconnect();
            return done();
          });
        };
        it('finds the queue position from UserList.users', function(done) {
          var expectation;
          expectation = function(disruptad) {
            return expect(disruptad.queuePosition).to.eql(4);
          };
          return testDisruptAdCreateUser(expectation, done);
        });
        it('gets the users id from the apps settings', function(done) {
          var expectation;
          expectation = function(disruptad) {
            return expect(disruptad.myId).to.eql('myId');
          };
          return testDisruptAdCreateUser(expectation, done);
        });
        return it('creates a new user', function(done) {
          var expectation;
          expectation = function(disruptad) {
            return expect(disruptad.user.id).to.eql('myId');
          };
          return testDisruptAdCreateUser(expectation, done);
        });
      });
    });
  });

}).call(this);
