var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.set('log level', 1)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var ID = (socket.id).toString().substr(0, 5);
	var time = (new Date).toLocaleTimeString();
	socket.json.send({'event': 'connected', 'name': ID, 'time': time});
  socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});
  
	socket.on('message', function (msg) {
		var time = (new Date).toLocaleTimeString();
		socket.json.send({'event': 'messageSent', 'name': ID, 'text': msg, 'time': time});
    socket.broadcast.json.send({'event': 'messageReceived', 'name': ID, 'text': msg, 'time': time})
  });

  socket.on('disconnect', function() {
		var time = (new Date).toLocaleTimeString();
		io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});