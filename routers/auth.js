import User from "../models/User.js";
import express from "express";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await User.create({
      username: username,
      password: password,
    });
    // if (!result) {
    //   return res.status(201).json({
    //     message: "Create a new user unsuccessfully.",
    //   });
    // }
    res.status(201).json({
      message: "Create a new user successfully.",
      userId: result._id,
      username: result.username,
    });
  } catch (err) {
    console.log('test2');
    res.status(400).json({
      message: err.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        message: `Can not find username: ${username}`,
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "The password is incorrect.",
      });
    }
    const payload = {
      userId: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // res.status(200).json({
    //   message: "Log in successfully.",
    // });
    res.status(200).json({
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default userRouter;
