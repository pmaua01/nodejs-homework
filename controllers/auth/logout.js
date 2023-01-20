const { User } = require("../../models/user");
const { httpError } = require("../../helpers/httpError");

async function logout(req, res, next) {
  console.log("req.user", req.user);
  const { _id: id } = req.user;
  if (!req.user) {
    return next(httpError(401, "Not authorized"));
  }

  try {
    await User.findByIdAndUpdate(id, { token: null });
  } catch (error) {
    return next(httpError(401, "Not error.message"));
  }
  return res.json(201, "Status: 204 No Content");
}

module.exports = { logout };
