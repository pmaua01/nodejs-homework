const { User } = require("../../models/user");
const { httpError } = require("../../helpers/httpError");
const { sendMail } = require("../../helpers/sendMail");

async function checkVerify(req, res, next) {
  const { email } = req.body;

  if (!email) {
    next(httpError(400, "missing required field email"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(httpError(400, "not such email in db"));
  }
  const { verificationToken } = user;
  if (verificationToken) {
    await sendMail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href="localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
    });
    return res.status(200).json({ email: email });
  }

  return next(httpError(400, "Verification has already been passed"));
}

module.exports = { checkVerify };
