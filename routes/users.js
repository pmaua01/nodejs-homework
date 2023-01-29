const express = require("express");

const { signup } = require("../controllers");
const { login } = require("../controllers");
const { logout } = require("../controllers");
const { auth } = require("../middlewares");
const { current } = require("../controllers");
const { upload } = require("../middlewares");

const { uploadLocal } = require("../controllers");

const { addUserSchema, validateAuth } = require("../validation/validation");

const authRouter = express.Router();

authRouter.post("/signup", validateAuth(addUserSchema), signup);

authRouter.post("/login", validateAuth(addUserSchema), login);
authRouter.post("/logout", auth, logout);
authRouter.post("/current", auth, current);
authRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),

  uploadLocal
);

module.exports = authRouter;
