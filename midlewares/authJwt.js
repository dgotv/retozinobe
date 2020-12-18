const Role = require('../components/roles/model');

const User = require('../components/user/model');

const admin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });
  cosnsole.log(roles);

  console.log('error');

  next();
};

module.exports = admin;
