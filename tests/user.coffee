expect = require('chai').expect
User   = require('../routes/user').User

describe 'User', ->

  beforeEach ->
    @user = new User 'NAME'

  it 'gets and sets a name', ->
    expect(@user.name).to.eql 'NAME'