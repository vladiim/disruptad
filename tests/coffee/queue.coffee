{ expect } = require('chai')
{ Queue }  = require('../../routes/queue')

UID  = 123
UID2 = 321

FIRST_USER =  { position: 1, user_id: UID }
SECOND_USER = { position: 2, user_id: UID2 }

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

expectTwoUsersInQueues = ->
    expect(Queue.one).to.eql({ name: 'one', "members": [FIRST_USER, SECOND_USER] })
    expect(Queue.two).to.eql({ name: 'two',"members": [FIRST_USER, SECOND_USER] })
    expect(Queue.three).to.eql({ name: 'three',"members": [FIRST_USER, SECOND_USER] })
    expect(Queue.four).to.eql({ name: 'four',"members": [FIRST_USER, SECOND_USER] })

describe 'Queue', ->

  describe 'no queues', ->
    it 'sets up four empty queues', ->
      expectAllQueuesEmpty()

  afterEach ->
    queue['members'] = [] for queue in Queue.queues

  describe 'add(user)', ->
    beforeEach ->
      Queue.add(UID)

    describe 'no one on any queue', ->
      it 'adds the user as the first person on each queue', ->
        expectOneUserInQueues()

    describe 'add second user', ->
      describe 'first user in each queue', ->
        it 'adds the second user', ->
          Queue.add(UID2)
          expectTwoUsersInQueues()

    describe 'remove(user)', ->
      describe 'only one user', ->
        it 'empties the queues', ->
          Queue.remove(UID)
          expectAllQueuesEmpty()

      describe 'more than one user,', ->

        describe 'remove user 2;', ->
          it 'leaves user one', ->
            Queue.add(UID2)
            Queue.remove(UID2)
            expectOneUserInQueues()

  describe 'removeFromMembers()', ->
    describe 'two members', ->
      beforeEach ->
        Queue.add(UID)
        Queue.add(UID2)

      afterEach -> queue['members'] = [] for queue in Queue.queues

      describe 'removeFromMembers()', ->
        describe 'with first user', ->
          it 'leaves user two and updates the users position', ->
            tested_fn = -> Queue.removeFromMembers(Queue.one['members'], UID)
            result    = [{ position: 1, user_id: UID2 }]
            expect(tested_fn()).to.eql(result)

        describe 'with second user', ->
          it 'leaves user one and does not update the users position', ->
            tested_fn = -> Queue.removeFromMembers(Queue.one['members'], UID2)
            result    = [{ position: 1 , user_id: UID }]
            expect(tested_fn()).to.eql(result)