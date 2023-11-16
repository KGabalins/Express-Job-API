require("dotenv").config();
const { UnauthorizedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new UnauthorizedError("Authentication invalid");

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user to the job routes
    const user = await User.findById(payload.userId).select("-password");
    req.user = user;

    next();
  } catch (err) {
    throw new UnauthorizedError("Authentication invalid");
  }
};

module.exports = auth;
