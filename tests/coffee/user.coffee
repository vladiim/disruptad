{ expect } = require('chai')
{ User }   = require('../routes/user')

describe 'User', ->

  beforeEach ->
    @user = new User

  it 'creates a uid for the user', ->
    expect(@user.uid).to.exist