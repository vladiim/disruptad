expect = require('chai').expect
User   = require('../routes/user').User

describe 'User', ->

  beforeEach ->
    @user = new User

  it 'creates a uid for the user', ->
    expect(@user.uid).to.exist