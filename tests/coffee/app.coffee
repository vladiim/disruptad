expect     = require('chai').expect
io         = require('socket.io-client')
{UserList} = require('../routes/user_list')
socketURL  = 'http://localhost:3000'

options =
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

    it "adds the user to the user list", (done) ->
      client = io.connect(socketURL, options)
      client.on 'connect', (data) ->
        client.on 'user created', (user) ->
          expect(UserList.all).to.include user
          client.disconnect()
          done()

    # it "adds the user to the users", (done) ->
    #   client = io.connect(socketURL, options)
    #   client.on 'connect', (data) ->
    #     client.on 'user created', (user_details) ->
    #       console.log user_details
    #       user  = user_details.user
    #       users = user_details.users
    #       expect(users).to.eql {user}
    #       client.disconnect()
    #       done()