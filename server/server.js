/**
 * Created by SUJIN CHOE on 2017-12-02.
 */

'use strict'
import express from 'express';
import socket from 'socket.io';
import http from 'http';
const port = 3000;
const app = express();
const server = http.Server(app);
const io = socket(server);
let users = {};
let room = {};

// connection이라는 command가 들어오면 수행
io.on('connection', (socket) => {
    console.log(socket.username + " is connected.");
    let username = socket.username;
    users[username] = username;
    socket.join(username);

    // 방만들기
    socket.on('addRoom', (data) => {
       let roomName = data.roomName;
       let maxMember = data.maxMember;
       let userlist = [data.user];
       let roomNum = data.roomNum;
       room[roomNum] = {
           roomName : roomName,
           roomNumber : roomNum,
           maxMember : maxMember,
           userlist : userlist
       };
       socket.join(roomNum);
    });


    // 채팅방에 입장
   socket.on('enterRoom', (data) => {
       let roomNum = data.roomNum;
       socket.join(roomNum);
    });

   // 채팅방 나가기
    socket.on('leaveRoom', (data) => {
       let roomNum = data.roomNum;
       let message = data.username + ' 님이 채팅방을 나가셨습니다.';
       socket.leave(roomNum);
       socket.broadcast.to(roomNum).emit('leaveRoom', message);
    });

   // 채팅방정보 가져오기
   socket.on('getRoomInfo', (data) => {
       let roomName = data.roomName;
       let roomNum = data.roomNum;
       let username = data.username;

       io.to(username).emit('sendRoomInfo', room[roomNum]);
   });

    // 채팅방에 채팅 전송
    socket.on('sendChatToRoom', (data) => {''
       var roomInfo = room[data.roomNum];
       var sendData = {
           chat : data.chat,
           sender : data.sender
       };
       io.socket.to(roomNum).emit('getChatToRoom', sendData);
    });

    // 전체 채팅에 채팅 전송
    socket.on('sendChatToAll', (data) => {
        var sendData = {
            chat : data.chat,
            sender : data.sender
        };
        socket.broadcast.emit('getChatToAll', sendData);
    });

    // 연결종료
    socket.on('disconnect', () => {
        console.log(socket.username + 'is disconnected.');
    });
});

server.listen(port, () => {
   console.log('[INFO] Listening on ' + port) ;
});