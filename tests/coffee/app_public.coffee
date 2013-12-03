expect  = require('chai').expect
{myId} = require('../../public/javascripts/app')

describe 'window.onload', ->
  beforeEach ->
    window = { onload: -> }
    window.onload()

  describe 'myId()', ->
    describe 'users cookie is set', ->
      it 'finds the users id based on their cookie', ->
        document = { cookie: "blah=lol; disruptad-holler-userId=1" }
        expect(myId(document)).to.eql(1)