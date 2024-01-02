const bcrypt = require("bcryptjs");

const hashPass = (originalPass) => {
  return bcrypt.hashSync(originalPass, bcrypt.genSaltSync(8));
};

const comparePass = (originalPass, hashedPass) => {
  return bcrypt.compareSync(originalPass, hashedPass);
};

module.exports = {
  hashPass,
  comparePass,
};