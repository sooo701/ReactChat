import express from 'express';
import User from '../models/user';
const router = express.Router();

// 가입
router.post('/join', (req, res) => {
  // 처음에 입력한 닉네임이 있으면 그 닉네임으로 입장
  var sendMessage = "";
  var username = req.body.username;
  var password = req.body.password;

  // 입력한 닉네임으로 입장한 유저가 있는지 확인
  User.findOne({username : username}, (err, exists) => {
    if (err) throw err;

    // 이미 유저가 존재할 경우 에러 메세지 전달
    if (exists) {
      return res.status(400).json({
        error : "이미 존재하는 이름입니다. 다른 이름을 입력해주세용"
      });
    }

    // 유저 생성
    let user = new User({
      username : username,
      password : password
    });

    user.password = user.generateHash(user.password);

    // db에 저장
    user.save(err => {
      if (err) throw err;
      return res.json({success : true});
    });

  });

});

// 로그인
// 로그인이 성공하면 세션에 아이디를 등록한다.
router.post('/login', (req, res) => {

  var username = req.body.username;
  var password = req.body.password;

  // user가 있는지 확인
  User.findOne({username : username}, (err, user) => {
    if (err) throw err;

    // 닉네임이 존재하는지 확인
    if (!user) {
      return res.status(400).json({
        error : "로그인에 실패하였습니다. 아이디 또는 비밀번호를 확인해주세요."
      });
    }

    // 패스워드가 다를때
    if (!user.validateHash(password)) {
      return res.status(400).json({
        error : "로그인에 실패하였습니다. 아이디 또는 비밀번호를 확인해주세요."
      });
    }

    // 로그인에 성공하면 아이디값을 세션에 등록
    let session = req.session;
    session.loginInfo = {
      _id : user._id,
      username : username
    };

    return res.json({
      success : true
    });
  });

});

// 유저정보 가져오기
// 세션에 정보를 저장해두고 새로고침을 하거나 재접속을 해도 들어갈수 있게 해준다.
router.post('/getInfo', (req, res) => {
  if (typeof req.session.loginInfo === 'undefined') {
    return res.status(401).json({

    });
  }

  res.json({info : req.session.loginInfo});
});

// 로그아웃
// 세션만 없애면 됨
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
  });
  return res.json({
    success : true
  });
});

// 닉네임 변경
router.post('/changeName', (req, res) => {
  res.json({success : true});
});

export default router;
