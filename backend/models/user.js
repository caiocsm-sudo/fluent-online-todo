const bcrypt = require("bcrypt");
const validator = require("validator");
const pool = require("../database/db");
const { v4: uuidv4 } = require('uuid');

class User {
  constructor(username, user_email, password) {
    this.username = username;
    this.user_email = user_email;
    this.password = password;
    this.id = null;
    this.user = null;
    this.errors = [];
  }

  async login() {
    this.checkErrors();
    if (this.errors.length > 0) return;

    const user = this.checkEmail("login");

    if (!user) {
      this.errors.push("Incorrect email and/or password");
      return;
    }

    // still to implement
  }

  async register() {
    this.checkErrors();
    const emailExist = this.checkEmail("register");

    if (emailExist) {
      this.errors.push("This email is already registered");
      return;
    }

    if (this.errors.length > 0) return;

    this.encryptPassword();

    // uuidv4 generating a random key for the id;
    this.id = v4();

    if (this.id) {
      const result = await pool.query(
        `INSERT INTO users (id, username, user_email, password) VALUEs ($1, $2, $3, $4)`,
        [this.id, this.username, this.user_email, this.password]
      );
      return { result: result.rows, token };
    }
  }

  async addProfileImage() {
    // TODO: You cannot create a user and already set the image
    // you need to create your user first, then you change the image;
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

  async checkEmail(caller) {
    const result = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [this.user_email]
    );

    if (caller === "register") {
      return result ? true : false;
    } else {
      return result;
    }
  }
}

module.exports = User;
