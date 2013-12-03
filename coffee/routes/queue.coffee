# Queue is a singleton class that keeps track of the number of people in 
# each of the four queues for Holler staff

# Queue has two main funcions:
#   @add(user_id) which adds a user to the four queues
#   @remove(user_id) which removes a user to the four queues

class Queue
  instance = null

  @one:   { name: 'one', 'members': [] }
  @two:   { name: 'two', 'members': [] }
  @three: { name: 'three', 'members': [] }
  @four:  { name: 'four', 'members': [] }

  @queues: [@one, @two, @three, @four]

  @add: (user_id) ->
    @addToQueue(queue, user_id) for queue in @queues

  @addToQueue: (queue, user_id) ->
    position = queue['members'].length + 1
    member   = { position: position, user_id: user_id }
    queue['members'].push(member)

  @remove: (user_id) ->
    @removeFromQueue(queue, user_id) for queue in @queues

  @removeFromQueue: (queue, user_id) ->
    switch queue['name']
      when 'one'   then @one['members']   = @removeMember(@one['members'], user_id)
      when 'two'   then @two['members']   = @removeMember(@two['members'], user_id)
      when 'three' then @three['members'] = @removeMember(@three['members'], user_id)
      when 'four'  then @four['members']  = @removeMember(@four['members'], user_id)

  @removeMember: (members, user_id) ->
    for member in members
      if member['user_id'] is user_id
        index = members.indexOf(member)
        deleted_member = members[index]
        members.splice(index, 1)
        for updated_member in members
          updated_index    = members.indexOf(updated_member)
          updated_position = members[updated_index]['position'] - 1
          if updated_position >= deleted_member['position']
            members[updated_index]['position'] = updated_position
        return members

root = exports ? window  
root.Queue = Queue