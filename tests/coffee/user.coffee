{ expect } = require('chai')
{ User }   = require('../../routes/user')

describe 'User', ->

  beforeEach ->
    @user = new User

  it 'creates a uid for the user', ->
    expect(@user.uid).to.exist

  describe '@queuePosition', ->
    describe 'no users in the user list', ->
      it 'is #1 in the queue', ->
        expect(@user.queuePosition).to.eql(1)

    describe '>0 users in the user list', ->
      it 'n+1 in the queue', ->
        positions = [1,5,10,43]
        testPositions for position in positions
        testPositions = (position) ->
          user = 
          expect()