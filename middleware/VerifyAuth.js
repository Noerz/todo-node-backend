const jwt = require("jsonwebtoken");
const db = require("../config/database");
const initModels = require("../models/init-models");
const models = initModels(db);


const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(400).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = {verifyToken};
