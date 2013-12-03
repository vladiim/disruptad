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
      when 'one'   then @one['members'] = []
      when 'two'   then @two['members'] = []
      when 'three' then @three['members'] = []
      when 'four'  then @four['members'] = []

root = exports ? window  
root.Queue = Queue