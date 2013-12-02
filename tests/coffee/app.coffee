expect     = require('chai').expect
sinon      = require('sinon')
io         = require('socket.io-client')
socketURL  = 'http://localhost:3000'
{ App }    = require('./app')

options =
  transports: ['websocket']
  'force new connection': true

describe "App", ->

  describe "on client connection", ->
    describe 'user created', ->
      testClientConnection = (expectation, done) ->
        client = io.connect(socketURL, options)
        client.on 'connect', (data) ->
          client.on 'user created', (data) ->
            expectation(data)
            client.disconnect()
            done()

      it "sets the client up as a user", (done) ->
        expectation = (data) -> expect(data.user).to.be
        testClientConnection(expectation, done)

      it "adds the user to the user list", (done) ->
        expectation = (data) ->
          expect(data.users).to.include(data.user)
        testClientConnection(expectation, done)