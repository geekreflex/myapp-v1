const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: 'Email already registered',
    });
  }

  const newUser = await User.create({
    fullname,
    email,
    password,
  });

  if (newUser) {
    return res.status(201).json({
      message: 'Registered successfully',
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).json({
      message: 'Invalid user data',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      message: 'Logged In successfully',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: 'Invalid email or password',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
