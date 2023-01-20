const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { httpError } = require("../helpers/httpError");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") {
    next(httpError(401, "Not authorized"));
  }
  if (!token) {
    next(httpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      next(httpError(401, "Not authorized"));
    }
    next(httpError(410, error.message));
  }
  next();
}

module.exports = { auth };
