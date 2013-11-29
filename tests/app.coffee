expect    = require('chai').expect
io        = require('socket.io-client')
socketURL = 'http://localhost:3000'
options   =
  transports: ['websocket']
  'force new connection': true

# http://swizec.com/blog/testing-socket-io-apps/swizec/5625
# http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/
# http://vijayannadi.wordpress.com/tutorials/sample-chat-app-using-nodejs-socketio/

describe "App", ->

  describe "on client connection", ->

    it "sets up a user with a uid", (done) ->
      client = io.connect(socketURL, options)

      client.on 'connect', (data) ->
        console.log 'connected'

        client.on 'user created', (user) ->
          console.log 'user created'
          expect(user.uid).to.exsist
          done()