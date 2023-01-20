const { User } = require("../../models/user");
const { httpError } = require("../../helpers/httpError");

async function current(req, res, next) {
  const { user } = req;
  console.log(user);
  const { email, subscription } = user;

  if (!user) {
    return next(httpError(401, "Not authorized"));
  }

  return res.json(200, { email, subscription });
}

module.exports = {
  current,
};
