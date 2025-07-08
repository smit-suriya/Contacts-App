const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @access public
exports.registerNewUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide all the details!!!");
  }
  const alreadyExistUser = await User.findOne({ email });
  if (alreadyExistUser) {
    res.status(400);
    throw new Error("User already registered!!!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(
  //   "Password : ",
  //   password,
  //   "and hashed password : ",
  //   hashedPassword
  // );

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  res.json({
    message: "Success",
    user,
    accessToken,
  });
});

// @access public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both the fields!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.json({ message: "Login Success", accessToken, user });
  } else {
    res.status(401);
    throw new Error("Email or password is not correct");
  }
});

// @access private
exports.currentUserInfo = asyncHandler(async (req, res) => {
  res.json(req.user);
});
