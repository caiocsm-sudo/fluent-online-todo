const bcrypt = require("bcrypt");
const validator = require("validator");
const pool = require("../database/db");
const uuid = require("uuid");
// não é possivel que essa porra instalada não ta funcionando, né

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

    const isPasswordCorrect = this.checkPassword();

    if (!user || isPasswordCorrect) {
      this.errors.push("Incorrect email and/or password");
      return;
    }

    const loggedUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [this.user_email]
    );

    return loggedUser.rows;
  }

  async register() {
    this.checkErrors();

    const emailExist = await this.checkEmail("register");

    console.log(emailExist.rows);

    if (emailExist.rows[0].user_email) {
      this.errors.push("This email is already registered");
      return;
    }

    if (this.errors.length > 0) return;

    this.encryptPassword();

    // uuidv4 generating a random key for the id;
    this.id = uuid.v4();

    if (this.id) {
      const result = await pool.query(
        `INSERT INTO users (id, username, user_email, password) VALUEs ($1, $2, $3, $4)`,
        [this.id, this.username, this.user_email, this.password]
      );

      console.log(result);

      return result;
    }
  }

  async addProfileImage() {
    // TODO: You cannot create a user and already set the image
    // you need to create your user first, then you change the image;
  }

  async checkPassword() {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      this.user_email,
    ]);

    console.log(user.rows);

    const isPasswordCorrect = await bcrypt.compare(
      this.password,
      user.rows[0].password
    );
    return isPasswordCorrect;
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

  async checkEmail() {
    const result = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [this.user_email]
    );

    return result;
  }
}

module.exports = User;
