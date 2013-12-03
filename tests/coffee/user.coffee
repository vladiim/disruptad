{ expect } = require('chai')
{ User }   = require('../../routes/user')

describe 'User', ->

  beforeEach ->
    @user = new User(123)

  it 'sets the users id', ->
    expect(@user.id).to.eql(123)