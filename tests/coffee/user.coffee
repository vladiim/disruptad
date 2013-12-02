{ expect } = require('chai')
{ User }   = require('../../routes/user')

describe 'User', ->

  beforeEach ->
    @user = new User

  it 'creates a uid for the user', ->
    expect(@user.uid).to.exist

  it 'sets the users socketId', ->
    user = new User(123, 321)
    expect(user.socketId).to.eql(123)

  it 'sets the users queuePosition', ->
    user = new User(123, 321)
    expect(user.queuePosition).to.eql(321)