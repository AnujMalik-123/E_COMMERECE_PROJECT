const Users = require("../models/userModels");
const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usectrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Email is already registered" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters long" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      await newUser.save();

      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ msg: "registration succesful", accesstoken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(400).json({ msg: "please login or register" });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "please login or register" });
        }
        const accesstoken = createAccessToken({ id: user.id });

        res.status(200).json({ accesstoken });
      });
    } catch (err) {
      return res.status(400).json("failed");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "user does not exist" });
      }
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(400).json({ msg: "incorrect password" });
      }

      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json(accesstoken);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      res.json({ msg: "log out " });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  getuser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) {
        return res.status(400).json({ msg: "user not found" });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = usectrl;
