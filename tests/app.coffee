expect    = require('chai').expect
io        = require('socket.io-client')
socketURL = 'http://localhost:3000'
options   =
  transports: ['websocket']
  'force new connection': true

# http://swizec.com/blog/testing-socket-io-apps/swizec/5625
# http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/
# http://vijayannadi.wordpress.com/tutorials/sample-chat-app-using-nodejs-socketio/

# describe 'App server', ->

#   beforeEach ->
#     app     = require('../app')
#     server  = app.server
#     @clients = app.clients

  # it 'adds new client to the clients', (done) ->
  #   client = io.connect(socketURL, options)

  #   client.on 'connect', (data) ->
  #     client.on 'echo', (message) ->
  #       console.log "Message: #{message}"
  #       expect(message).to.eql "bl"
  #     done()
  #     client.emit 'echo', 'Word'

chatUser1 = {'name':'Tom'}
chatUser2 = {'name':'Sally'}
chatUser3 = {'name':'Dana'}

describe "test", ->
  it 'blah', (done) ->
    client1 = io.connect(socketURL, options)

    client1.on 'connect', (data) ->
      console.log 'Client 1 connected'
      client1.emit 'connection name', chatUser1

      client1.on 'connection name', (user) -> console.log 'Client 1 cname emmited'


      client2 = io.connect(socketURL, options)

      client2.on 'connect', (data) ->
        console.log 'Client 2 connected'
        client2.emit 'connection name', chatUser2

      client2.on 'new user', (usersName) ->
        console.log 'Client 2 new user'
        expect(usersName).to.eql "#{chatUser2.name} has joined."

        client2.disconnect()

      client2.on 'disconnect', (data) ->
        console.log 'Client 2 disconnect'

    numUsers = 0

    client1.on 'new user', (usersName) ->
      console.log 'Client 1 new user'
      numUsers += 1

      if numUsers is 2
        expect(usersName).to.eql "#{chatUser2.name} has joined."
        client1.disconnect()
        done()