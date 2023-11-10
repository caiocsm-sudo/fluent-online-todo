const bcrypt = require("bcrypt");
const validator = require("validator");
const pool = require("../database/db");

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

    const result = await pool.query("INSERT INTO users");
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
