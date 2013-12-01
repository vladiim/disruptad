expect     = require('chai').expect
io         = require('socket.io-client')
socketURL  = 'http://localhost:3000'

options =
  transports: ['websocket']
  'force new connection': true

describe "App", ->

  describe "on client connection", ->
    testClientConnection = (expectation, done) ->
      client = io.connect(socketURL, options)
      client.on 'connect', (data) ->
        client.on 'user created', (user) ->
          expectation(user)
          client.disconnect()
          done()

    it "sets the client up as a user", (done) ->
      expectation = (user) -> expect(user).to.be
      testClientConnection(expectation, done)

    # it "adds the user to the user list", (done) ->
    #   expectation = (user) ->
    #     expect(UserList.users).to.include(user)
    #   testClientConnection(expectation, done)