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

  describe("App", function() {});

}).call(this);
