expect    = require('chai').expect
io        = require('socket.io-client')
User      = require('../routes/user').User
socketURL = 'http://localhost:3000'

options   =
  transports: ['websocket']
  'force new connection': true

describe "App", ->

  describe "on client connection", ->

    it "sets the client up as a user", (done) ->
      client = io.connect(socketURL, options)
      client.on 'connect', (data) ->
        client.on 'user created', (user) ->
          expect(user).to.be
          client.disconnect()
          done()