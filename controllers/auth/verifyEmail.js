const { User } = require("../../models/user");
const { httpError } = require("../../helpers/httpError");

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({
    verificationToken,
  });

  if (!user) {
    return next(httpError(404, "User not found"));
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.json(200, "Verification successful");
}

module.exports = { verifyEmail };
