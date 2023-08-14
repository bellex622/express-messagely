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

  const result = await db.query(
    "SELECT password FROM users WHERE username = $1",
    [username]);

  const user = result.rows[0];
  const authenticated = await User.authenticate(username, password);

  if (authenticated) {
      const token = jwt.sign({ username }, SECRET_KEY);
      return res.json({ token });
    }
  throw new UnauthorizedError("Invalid user/password");
});

/** POST /register: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 */

router.post("/register", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  // const { username, password, first_name, last_name, phone, notes } = req.body;
  hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  req.body.password = hashedPassword;

  const user = await User.register(req.body);
});

module.exports = router;