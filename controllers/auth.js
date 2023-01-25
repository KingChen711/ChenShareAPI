require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const userData = req.body;
  try {
    const foundUser = await User.findOne({ email: userData.email });

    if (!foundUser) {
      const newUser = new User(userData);
      await newUser.save();
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res
        .status(200)
        .json({ message: 'Success login!', user: newUser, accessToken });
    }

    const accessToken = jwt.sign(
      { userId: foundUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res
      .status(200)
      .json({ message: 'Success login!', user: foundUser, accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Interval server error!' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.userId);
    res.status(200).json({ user: foundUser });
  } catch (error) {
    res.status(500).json({ message: 'Interval server error!' });
  }
};
