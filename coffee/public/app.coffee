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

class ClientDocument
  @introMessage:   $('#intro-message')
  @keyStream:      $('#key-stream')
  @disruptMessage: $('#disrupt-message')
  @disruptButton: "<a id='disrupt-button' href='/'>DISRUPT</a>"

class Ustream
  @streams:   ['utv16093748']
  @stream:    @streams[0]
  @type:      "application/x-shockwave-flash"
  @data:      "http://static-cdn1.ustream.tv/swf/live/viewer:230.swf?vrsl=c:566&ulbr=100"
  @flashvars: "autoplay=true&locale=en_SG&referrer=unknown&autoResize=false&enablejsapi=true&ts=1384150323509&cid=16093748"
  @object:    "<object type='#{@type}' data='#{@data}' width='100%' height='100%' id='#{@stream}' name='#{@stream}'>"
  @param1:    "<param name='flashvars' value='#{@flashvars}'>"
  @param2:    "<param name='allowfullscreen' value='true'>"
  @param3:    "<param name='allowscriptaccess' value='always'>"
  @param4:    "<param name='bgcolor' value='opaque'>"
  @param5:    "<param name='wmode' value='opaque'>"

  @html: ->
    "#{@object}#{@param1}#{@param2}#{@param3}#{@param4}#{@param5}</object>"

window.onload = ->
  socket  = io.connect('http://localhost:3000')

  socket.on 'user created', (data) ->
    console.log("myid: #{myId()}")
    user  = JSON.parse(data.user)
    users = JSON.parse(data.users)
    one   = JSON.parse(data.one)
    me    = findMe(users)
    ClientDocument.keyStream.html(Ustream.html())

root = exports ? window
root.myId = myId