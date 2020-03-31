const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// salt의 자리수
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  // 토큰 유효기간
  tokenExp: {
    type: Number
  }
});

// User Model 저장하기 전 호출 함수
userSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    // 비밀번호 암호화, salt 생성
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // plainPassword => 암호화된 비밀번호
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  const user = this;

  // jsonwebtoken을 이용해서 token 생성
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  /* 
    user._id + 'secretToken' => token,
    'secretToken' => user._id
  */

  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);

    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
  const user = this;

  // token을 decode한다.
  jwt.verify(token, "secretToken", (err, decoded) => {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, (err, user) => {
      if (err) return cb(err);

      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
