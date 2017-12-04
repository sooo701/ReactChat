/**
 * Created by SUJIN CHOE on 2017-12-02.
 */

import express from 'express';
import socket from 'socket.io';
const port = 3000;
const app = express();
const server = app.listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        open('http://localhost:${port}');
    }
});

const io = socket(server);



// connection이라는 command가 들어오면 수행
io.on('connection', (socket) => {
    console.log(socket.username + " is connected.");

    // 채팅방에 입장
    socket.on('room', function(data) {
        socket.join(data.room);
    });

    // 채팅방 정보 가져오기
    socket.on('roomInfo', function(data) {

    });

    socket.on('disconnect', () => {
        console.log(socket.username + 'is disconnected.');
    });



    
});