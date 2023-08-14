"use strict";

const Router = require("express").Router;
const router = new Router();
const { BadRequestError } = require("../expressError");
const User = require("../models/user");


/** POST /login: {username, password} => {token} */


/** POST /register: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 */

router.post("/register", async function (req, res, next) {
  if (req.body === undefined) throw new BadRequestError();
  // const { username, password, first_name, last_name, phone, notes } = req.body;
  hashedPassword = await bcrypt.hash(password, 12);
  req.body.password = hashedPassword;

  const user = await User.register(req.body);
});

module.exports = router;