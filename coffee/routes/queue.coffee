class Queue
  instance = null

  @one:   { name: 'one', 'members': [] }
  @two:   { name: 'two', 'members': [] }
  @three: { name: 'three', 'members': [] }
  @four:  { name: 'four', 'members': [] }

  @queues: [@one, @two, @three, @four]

  @add: (user) ->
    id     = user.id
    member = { position: 1, user_id: id }
    queue['members'].push(member) for queue in @queues

  @remove: (user) ->
    id = user.id
    @removeFromQueue(queue, id) for queue in @queues

  @removeFromQueue: (queue, user_id) ->
    switch queue['name']
      when 'one'   then @one['members'] = []
      when 'two'   then @two['members'] = []
      when 'three' then @three['members'] = []
      when 'four'  then @four['members'] = []

root = exports ? window  
root.Queue = Queue