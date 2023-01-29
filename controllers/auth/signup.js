const { User } = require("../../models/user");
const { httpError } = require("../../helpers/httpError");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

async function signup(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email, { s: "250" }, false);
  console.log(avatarURL);
  try {
    await User.create({ email, password: hashedPass, avatarURL });
    res.status(200).json({ email: email, password: password });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(httpError(409, "Email in use"));
    }

    throw error;
  }
}

module.exports = {
  signup,
};
