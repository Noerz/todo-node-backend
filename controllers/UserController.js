const db = require("../config/database");
const initModels = require("../models/init-models");
const models = initModels(db);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { log } = require("debug/src/browser");

const Register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await models.user.findOne({ where: { username } });
    const existingEmail = await models.user.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await models.user.create({
      id: uuid.v4(),
      username: username,
      email: email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "User Created",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await models.user.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const result = {
      //   id: user.id,
      //   username: user.username,
      //   email: user.email,
      accessToken,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

module.exports = { Register, Login };
