#
# GET home page.
# 
index = (req, res) ->
  res.render "index",
    title: "Homepage"

root = exports ? window  
root.index = index