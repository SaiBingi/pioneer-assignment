const bcrypt = require('bcrypt');

module.exports = {
  // Hash password
  async hashPassword(password) {
    return bcrypt.hash(password, 8);
  },

  // Verify password
  async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
};
