"use strict";

const bcrypt = require("bcrypt");
const { NotFoundError } = require("../expressError");

/** User of the site. */

class User {

  /** Register new user. Returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {

    const result = await db.query(
      `INSERT INTO users (
        username,
        password,
        first_name,
        last_name,
        phone
        )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING
              username,
              password,
              first_name,
              last_name,
              phone,`,
      [username, password, first_name, last_name, phone],
    );
    const user = result.rows[0];

    return user;
  }

  /** Authenticate: is username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT password FROM users WHERE username = $1`,
      [username]);
    const user = result.rows[0];

    return (await bcrypt.compare(password, user.password)) === true;

  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const result = await db.query(
      `UPDATE users SET last_login_time = CURRENT_TIMESTAMP
      WHERE username = $1 RETURNING username`,
      [username]);

    const user = result.rows[0];

    if (!user) throw new NotFoundError;


  }

  /** All: basic info on all users:
   * [{username, first_name, last_name}, ...] */

  static async all() {
    const results = await db.query(
      `SELECT username,first_name,last_name,FROM users ORDER BY username`);

    return results.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const result = await db.query(
      `SELECT username, first_name, last_name, phone, join_at, last_login_at
       FROM users WHERE username = $1`,
      [username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError;

    return user;



  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const results = await db.query(
      `SELECT m.id,
        m.to_username,
        m.body,
        m.sent_at,
        m.read_at
      FROM messages As m
          JOIN users ON m.from_username = $1`,
      [username]
    );

    messages = results.rows;

    const toUsernames = results.rows.map(row => row.to_username);









  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
  }
}


module.exports = User;
