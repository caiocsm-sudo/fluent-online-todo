const bcrypt = require("bcrypt");
const validator = require("validator");
const pool = require("../database/db");
const { uuidv4 } = require(uuidv4);

class User {
  constructor(username, user_email, password) {
    this.username = username;
    this.user_email = user_email;
    this.password = password;
    this.user = null;
    this.errors = [];
  }

  async login() {
    this.checkErrors();
    if (this.errors.length > 0) return;

    const result = await pool.query();
  }

  async register() {
    this.checkErrors();
    if (this.errors.length > 0) return;

    this.encryptPassword();

    // const data = await pool.query("INSERT INTO users");

    const result = await pool.query(
      `INSERT INTO users (id, username, user_email, password) VALUEs ($1, $2, $3, $4)`,
      [id, this.username, this.user_email, this.password]
    );
  }

  encryptPassword() {
    const hash = bcrypt.genSaltSync(10);
    const encrypted = bcrypt.hashSync(this.password, hash);

    return (this.password = encrypted);
  }

  checkErrors() {
    if (!validator.default.isEmail(this.user_email)) {
      this.errors.push("Please, type a valid e-mail");
    }
    if (this.password.length < 6 && this.password.length > 15) {
      this.errors.push("your password is not at an acceptable length.");
    }
    if (this.username.length < 3 && this.username.length > 25) {
      this.errors.push("Your username is not at an accepted length.");
    }
  }
}

module.exports = User;
