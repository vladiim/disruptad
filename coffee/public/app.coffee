# for testing purposes
# if !window then window = {}

HOLLER_COOKIE = 'disruptad-holler-userId'

myId = ->
  cookies = document.cookie.split('; ')
  for cookie in cookies
    split_cookie = cookie.split('=')
    key          = split_cookie[0]
    value        = split_cookie[1]
    return parseInt(value) if key is HOLLER_COOKIE

findMe = (users) ->
  myId = myId()
  for user in users
    return user if user.id is myId

class Ustream
  @streams:   ['utv16093748']
  @stream:    @streams[0]
  @type:      "application/x-shockwave-flash"
  @data:      "http://static-cdn1.ustream.tv/swf/live/viewer:230.swf?vrsl=c:566&ulbr=100"
  @flashvars: "autoplay=true&locale=en_SG&referrer=unknown&autoResize=false&enablejsapi=true&ts=1384150323509&cid=16093748"
  @object:    "<object type='#{@type}' width='100%' height='100%' id='#{@stream}' name='#{@stream}'>"
  @param1:    "<param name='flashvars' value='#{@flashvars}'>"
  @param2:    "<param name='allowfullscreen' value='true'>"
  @param3:    "<param name='allowscriptaccess' value='always'>"
  @param4:    "<param name='bgcolor' value='opaque'>"
  @param5:    "<param name='wmode' value='opaque'>"

  @html: ->
    "#{@object}#{@param1}#{@param2}#{@param3}#{@param4}#{@param5}</object>"

window.onload = ->
  socket    = io.connect('http://localhost:3000')
  message   = $('#disrupt-message')
  keyStream = $('#key-stream')
  button    = "<a id='disrupt-button' href='/'>DISRUPT</a>"

  socket.on 'connect', (data) ->    

    socket.on 'user created', (data) ->
      user  = JSON.parse(data.user)
      users = JSON.parse(data.users)
      one   = JSON.parse(data.one)
      me    = findMe(users)
      keyStream.html(Ustream.html())

root = exports ? window
root.myId = myId