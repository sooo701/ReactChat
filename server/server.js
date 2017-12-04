/**
 * Created by SUJIN CHOE on 2017-12-02.
 */

import express from 'express';
import socket from 'socket.io';
import http from 'http';
const port = 3000;
const app = express();
const server = http.Server(app);
const io = socket(server);
let users = [];
let sockets = {};


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

    // 연결종료
    socket.on('disconnect', () => {
        console.log(socket.username + 'is disconnected.');
    });



    
});

server.listen(port, () => {
   console.log('[INFO] Listening on ' + port) ;
});