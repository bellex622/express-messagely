"use strict";

const Router = require("express").Router;
const router = new Router();

const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../expressError");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const JWT_OPTIONS = { expiresIn: 60 * 60 };

/** POST /login: {username, password} => {token} */

router.post("/login", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  const { username, password } = req.body;

  const authenticated = await User.authenticate(username, password);

  if (authenticated) {
    const token = jwt.sign(
      { username: username,
        iat: (new Date().getTime())
        //set manually?
      },
        SECRET_KEY);
    await User.updateLoginTimestamp(username);
    return res.json({ token });
  } else {

    throw new UnauthorizedError("Invalid user/password");
  }

});

/** POST /register: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 */

router.post("/register", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();

  const { username } = await User.register(req.body);

  await User.updateLoginTimestamp(username);// await?

  const token = jwt.sign(
    { username: username,
      iat: (new Date().getTime())
      //set manually?
    },
      SECRET_KEY);

  return res.json({ token });
});

module.exports = router;