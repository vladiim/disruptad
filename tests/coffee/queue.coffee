{ expect } = require('chai')
{ Queue }  = require('../../routes/queue')

USER_ID = 123

FIRST_USER =  { position: 1, user_id: USER_ID }

EMPTY_ONE =   { name: 'one', 'members': [] }
EMPTY_TWO =   { name: 'two', 'members': [] }
EMPTY_THREE = { name: 'three', 'members': [] }
EMPTY_FOUR =  { name: 'four', 'members': [] }

expectAllQueuesEmpty = ->
  expect(Queue.one).to.eql(EMPTY_ONE)
  expect(Queue.two).to.eql(EMPTY_TWO)
  expect(Queue.three).to.eql(EMPTY_THREE)
  expect(Queue.four).to.eql(EMPTY_FOUR)

expectOneUserInQueues = ->
    expect(Queue.one).to.eql({ name: 'one', "members": [FIRST_USER] })
    expect(Queue.two).to.eql({ name: 'two',"members": [FIRST_USER] })
    expect(Queue.three).to.eql({ name: 'three',"members": [FIRST_USER] })
    expect(Queue.four).to.eql({ name: 'four',"members": [FIRST_USER] })

describe 'Queue', ->
  describe 'no queues', ->
    it 'sets up four empty queues', ->
      expectAllQueuesEmpty()

  afterEach ->
    queue = [] for queue in Queue.queues

  describe 'add(user)', ->
    beforeEach ->
      @user = { id: USER_ID }
      Queue.add(@user)

    describe 'no one on any queue', ->
      it 'adds the user as the first person on each queue', ->
        expectOneUserInQueues()

    describe 'remove(user)', ->
      describe 'only one user', ->
        it 'empties the queues', ->
          Queue.remove(@user)
          expectAllQueuesEmpty()