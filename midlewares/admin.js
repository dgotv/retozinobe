const Role = require('../components/roles/model');

const User = require('../components/user/model');

const admin = async (req, res, next) => {
  const userId = req.session.userIn;

  const user = await User.findById(userId._id);
  const roles = await Role.find({ _id: { $in: user.roles } });
  console.log(roles);

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'admin') {
      next();
    }
    return;
  }

  return res.send('no eres admin').json({ message: 'requiere administrador' });
};

module.exports = admin;
