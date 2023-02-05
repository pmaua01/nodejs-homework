const { signup } = require("./signup");
const { login } = require("./login");
const { logout } = require("./logout");
const { current } = require("./current");
const { verifyEmail } = require("./verifyEmail");
const { checkVerify } = require("./checkVerify");

module.exports = {
  signup,
  login,
  logout,
  current,
  verifyEmail,
  checkVerify,
};
