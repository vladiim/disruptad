index = (req, res) ->
  res.render "index",
    title:     "DisruptAd"
    stream:    "utv16093748"
    type:      "application/x-shockwave-flash"
    data:      "http://static-cdn1.ustream.tv/swf/live/viewer:230.swf?vrsl=c:566&ulbr=100"
    flashvars: "autoplay=true&locale=en_SG&referrer=unknown&autoResize=false&enablejsapi=true&ts=1384150323509&cid=16093748"

root = exports ? window  
root.index = index