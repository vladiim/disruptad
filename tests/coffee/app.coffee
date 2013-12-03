expect    = require('chai').expect
sinon     = require('sinon')
io        = require('socket.io-client')
socketURL = 'http://localhost:3000'
{ DisruptAd } = require('../../app')

options =
  transports: ['websocket']
  'force new connection': true

describe "App", ->

  # describe 'DisruptAd', ->
  #   describe '#createUser', ->
  #     testDisruptAdCreateUser = (expectation, done) ->
  #       client = io.connect(socketURL, options)
  #       client.on 'connect', (data) ->
  #         UserList  = { users: [1,2,3], add: -> }
  #         app = { get: (arg) -> 'myId' }
  #         disruptad = new DisruptAd(UserList, app)
  #         disruptad.createUser()
  #         expectation(disruptad)
  #         client.disconnect()
  #         done()

  #     it 'finds the queue position from UserList.users', (done) ->
  #       expectation = (disruptad) -> expect(disruptad.queuePosition).to.eql(4)
  #       testDisruptAdCreateUser(expectation, done)

  #     it 'gets the users id from the apps settings', (done) ->
  #       expectation = (disruptad) -> expect(disruptad.myId).to.eql('myId')
  #       testDisruptAdCreateUser(expectation, done)

  #     it 'creates a new user', (done) ->
  #       expectation = (disruptad) -> expect(disruptad.user.id).to.eql('myId')
  #       testDisruptAdCreateUser(expectation, done)

  # describe "on client connection", ->
  #   describe 'user created', ->
  #     testClientConnection = (expectation, done) ->
  #       client = io.connect(socketURL, options)
  #       client.on 'connect', (data) ->
  #         client.on 'user created', (data) ->
  #           expectation(data)
  #           client.disconnect()
  #           done()

  #     it "sets the client up as a user", (done) ->
  #       expectation = (data) -> expect(data.user).to.be
  #       testClientConnection(expectation, done)

  #     it "adds the user to the user list", (done) ->
  #       expectation = (data) ->
  #         expect(data.users).to.include(data.user)
  #       testClientConnection(expectation, done)