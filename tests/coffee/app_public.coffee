expect  = require('chai').expect

{ queuePosition } = require('../../public/javascripts/app')

#### ----------- ### Helper #### ----------- ###

describe 'window.onload', ->
  beforeEach ->
    window = { onload: -> }
    window.onload()

#### ----------- ### TDD @myId() #### ----------- ###
# {myId} = require('../../public/javascripts/app')

#   describe 'myId()', ->
#     describe 'users cookie is set', ->
#       it 'finds the users id based on their cookie', ->
#         document = { cookie: "blah=lol; disruptad-holler-userId=1" }
#         expect(myId(document)).to.eql(1)

#### ----------- ### TDD @queuePosition() #### ----------- ###

# { queuePosition } = require('../../public/javascripts/app')

describe 