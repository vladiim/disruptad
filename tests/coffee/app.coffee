expect    = require('chai').expect
sinon     = require('sinon')
io        = require('socket.io-client')
socketURL = 'http://localhost:3000'
{ DisruptAd } = require('../../app')

options =
  transports: ['websocket']
  'force new connection': true

describe "App", ->

  describe "on client connection", ->
    describe 'user created', ->
      it 'creates the user, adds ', (done) ->
        client = io.connect(socketURL, options)
        client.on 'connect', (data) ->
          client.on 'user created', (data) ->
            user  = JSON.parse(data.user)
            users = JSON.parse(data.users)
            one   = JSON.parse(data.one)
            expect(users[0].id).to.eql(user.id)
            expect(one['members'][0]['user_id']).to.eql(user.id)
            client.disconnect()
            done()