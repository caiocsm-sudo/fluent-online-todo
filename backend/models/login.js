const bcrypt = require('bcrypt');

class Register 
{
  constructor(username, user_email, password) {
    this.username = username;
    this.user_email = user_email;
    this.password = password;
  }

  async encryptPassword() {
    
  }
}