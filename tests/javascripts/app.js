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
    return describe("on client connection", function() {
      return describe('user created', function() {
        return it('creates the user, adds ', function(done) {
          var client;
          client = io.connect(socketURL, options);
          return client.on('connect', function(data) {
            return client.on('user created', function(data) {
              var one, user, users;
              user = JSON.parse(data.user);
              users = JSON.parse(data.users);
              one = JSON.parse(data.one);
              expect(users[0].id).to.eql(user.id);
              expect(one['members'][0]['user_id']).to.eql(user.id);
              client.disconnect();
              return done();
            });
          });
        });
      });
    });
  });

}).call(this);
