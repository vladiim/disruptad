expect    = require('chai').expect
io        = require('socket.io-client')
app       = require('../app')
server    = app.server
clients   = app.clients
socketURL = 'http://0.0.0.0:3000'
options   =
  transports: ['websocket']
  'force new connection': true

# http://swizec.com/blog/testing-socket-io-apps/swizec/5625
# http://liamkaufman.com/blog/2012/01/28/testing-socketio-with-mocha-should-and-socketio-client/
# http://vijayannadi.wordpress.com/tutorials/sample-chat-app-using-nodejs-socketio/

describe 'App server', ->
  it 'adds new client to the clients', ->
    client = io.connect(socketURL, options)
    client.emit 'connection'
    console.log clients
    expect(Object.keys(clients).length).to.eql 1