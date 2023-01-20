const { User } = require("../../models/user");
const { httpError } = require("../../helpers/httpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  const { email, password } = req.body;
  console.log(email, password);
  const findUser = await User.findOne({ email });

  if (!findUser) {
    return next(httpError(401, "Email or password is wrong"));
  }
  const isPasswordValid = await bcrypt.compare(password, findUser.password);
  if (!isPasswordValid) {
    return next(httpError(401, "Email or password is wrong"));
  }
  const token = jwt.sign({ id: findUser._id }, process.env.JWT_TOKEN, {
    expiresIn: "1h",
  });
  const { email: activeUserEmail, subscription } = findUser;

  await User.findByIdAndUpdate(findUser._id, { token });
  return res.json({
    token,
    user: { email: activeUserEmail, subscription },
  });
}

module.exports = { login };
