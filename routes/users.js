"use strict";

const Router = require("express").Router;
const router = new Router();

const { BadRequestError, UnauthorizedError } = require("../expressError");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name}, ...]}
 *
 **/

router.get("/",
  ensureLoggedIn,
  async function (req, res, next) {
  const users = await User.all();

  return res.json({ users });
})


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get("/:username",
  ensureLoggedIn,
  async function (req, res, next) {
  const users = await User.get(username);

  return res.json({ users });
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

function ensureLoggedIn(req, res, next) {
  const user = res.locals.user;
  if (user && user.username) {
    return next();
  }
  throw new UnauthorizedError();
}

module.exports = router;