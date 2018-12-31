
var socketIO = require('socket.io');
var express=require('express');
var app = express();
var server = require('http').createServer(app).listen(process.env.PORT||7000, '0.0.0.0');;


app.get('/', function(req, res){
   res.send("Hello world!");
});

var io = socketIO.listen(server);

io.sockets.on('connection', function (client) {
    console.log('new connection: ' + client.id);

    client.on('offer', function (details) {
        client.broadcast.emit('offer', details);
        console.log('offer: ' + JSON.stringify(details));
    });

    client.on('answer', function (details) {
        client.broadcast.emit('answer', details);
        console.log('answer: ' + JSON.stringify(details));
    });
    
    client.on('candidate', function (details) {
        client.broadcast.emit('candidate', details);
        console.log('candidate: ' + JSON.stringify(details));
    });

    // Here starts evertyhing!
    // The first connection doesn't send anything (no other clients)
    // Second connection emits the message to start the SDP negotation
    client.broadcast.emit('createoffer', {});
});
