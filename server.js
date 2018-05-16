var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var users = [];
var chats = [];
// var path = require('path');

// app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var redvarse = io.of('/redvarse');

redvarse.on('connection', function (socket) {
    socket.on('broadcast', function (msg) {
        if (msg != '> ' && msg != '' && msg != ' ') {
            redvarse.emit('broadcast', msg);
        }
        // var roster = io.sockets.clients('chatroom1');
        // for (i in roster) {
        //     console.log('Username: ' + roster[i]);
        // }
    });

    socket.on('send-nickname', function (nickname) {
        socket.nickname = nickname;
        users.push(socket.nickname);
        console.log(users);
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});