const fs = require("fs/promises");
const path = require("path");
const { httpError } = require("../../helpers/httpError");
const { User } = require("../../models/user");
const Jimp = require("jimp");

async function uploadLocal(req, res, next) {
  const { file } = req;
  const { userIdAfterMiddle } = req;

  const filename = file.filename;

  const tmpPath = path.resolve(__dirname, "../../tmp", filename);
  const tmpPathsmall = path.resolve(
    __dirname,
    "../../tmp",
    `small,${filename}`
  );

  console.log("tmpPathsmall", tmpPathsmall);

  const publicPath = path.resolve(__dirname, "../../public/avatars", filename);
  //   await Jimp.read(tmpPath)
  //     .then((image) => {
  //       return image.resize(250, 250).write(tmpPath);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  console.log("tmpPath", tmpPath);
  //   console.log("tmpPath", tmpPath);
  //   console.log("publiPath", publicPath);
  try {
    const resize = await Jimp.read(tmpPath);
    resize.resize(250, 250).write(tmpPath);
    await fs.rename(tmpPath, publicPath);
    await User.findByIdAndUpdate(userIdAfterMiddle, {
      avatarURL: `http://localhost:3000/avatars/${filename}`,
    });
  } catch (error) {
    return next(httpError(401, "Not authorized"));
  }

  return res
    .status(200)
    .json({ message: `http://localhost:3000/avatars/${filename}` });
}

module.exports = { uploadLocal };
