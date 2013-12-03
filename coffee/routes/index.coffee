{ UserList } = require('./user_list')

index = (req, res) ->
  res.render   "index",
    title:     "Disrupt xmas"

root = exports ? window  
root.index = index