import express from 'express';
import Room from '../models/room';
const router = express.Router();

// 방만들기
router.post('/rooms', (req, res) => {
  // 방을 만들기 때문에 세션에서 사용자의 아이디를 가져와서
  // 처음 멤버로 집어넣는다.
  let username = req.session.username;
  let maxMember = req.body.maxMember;
  let userlist = {username};
  Room.create({username, maxMember, userlist}, (err, room) => {
    if (err) throw err;
    res.json({success : success});
  });
});
// 방정보 가져오기
// 채팅방 목록에서 우클릭했을때 방에 대한 참여정보를 가져옴
router.get('/roomInfo', (req, res) => {
  let roomNumber = req.body.roomNumber;
  Room.find({roomNumber : roomNumber}, (err, room) => {
    if (err) throw err;
    res.json({room : room});
  });
});

// 방 입장하기
router.post('/enterRoom', (req, res) => {
  // 입장하고자 하는 방번호를 받아옴
  let roomNumber = req.body.roomNumber;
  let username = req.session.username;

  // 방이 있는지 찾고 없으면 에러
  // 있으면 참가인원수 확인해서 참여여부 결정
  Room.find({roomNumber : roomNumber}, (err, room) => {
    if (err) throw err;
    if (!room) throw err;

    // 방의 최대 인원수가 현재 있는 사람보다 많다면
    // 목록에 사람을 추가하고 save해준다.

    if (room.maxNumber > room.userList.length) {
      room.userList = {username};

      room.save((err) => {
        if (err) throw err;
        res.json({success : true});
      });
    }

  });
  res.json({success : true});
});

// 방 떠나기
router.post('/leaveRoom', (req, res) => {
  let roomNumber = req.body.roomNumber;
  Room.remove({roomNumber : roomNumber}, (err, room) => {
    if (err) throw err;
    res.json({success : true});
  });
});

export default router;
