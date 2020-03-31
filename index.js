const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const config = require("./config/key");

/* Models */
const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch(err => console.log("err: ", err));

// Router
app.get("/", (req, res) => res.send("Hello World!"));

app.post("/api/users/resigter", (req, res) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  // 요청된 이메일 찾기
  User.findOne({ email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      });
    }

    // 요청된 이메일이 있다면, 비밀번호가 맞는지 확인
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        });

      // 비밀번호 까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. (쿠키 || 로컬스토리지)
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id
          });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  const { _id, role, email, name, lastname, image } = req.user;
  /* 
    role 0 => 일반유저,
         0이 아니면 => 관리자
  */
  res.status(200).json({
    _id,
    isAdmin: role === 0 ? false : true,
    isAuth: true,
    email,
    name,
    lastname,
    role,
    image
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  const { _id } = req.user;

  User.findOneAndUpdate({ _id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).send({
      success: true
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
