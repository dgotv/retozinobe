const Model = require('./model');

function userRegister(user) {
  const savedUser = new Model(user);
  console.log('usuario registrado store');

  return savedUser.save();
}

module.exports = {
  add: userRegister
};
