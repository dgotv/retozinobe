const User = require('./model');
const store = require('./store');
const jwt = require('jsonwebtoken');

const Role = require('../roles/model');

async function userRegister(userName, mail, password, confirmPassword, roles) {
  if (!(userName, mail, password, confirmPassword)) {
    return Promise.reject('Invalid register');
  }

  const user = {
    userName,
    mail,
    password: await User.encryptPassword(password),
    confirmPassword
  };

  console.log(user);
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map((role) => role.id);
    console.log(foundRoles);
  } else {
    const role = await Role.findOne({ name: 'user' });
    user.roles = [role._id];
    console.log(role);
  }
  //falta configurar el config.secret
  const token = await jwt.sign({ id: user._id }, 'secret', {
    expiresIn: 80000
  });
  // res.send('token exitoso')
  return store.add(user).send({ token });
}

const userLogin = async (req, res) => {
  const userFound = await User.findOne({
    userName: req.body.userName
  }).populate('roles');
  if (!userFound)
    return res.status(400).json({ message: 'usuario no encontrado ' });

  console.log(userFound);

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res
      .status(401)
      .json({ token: null, message: 'contraseña invalida' });

  const rol = userFound.roles;
  console.log(rol);

  const token = jwt.sign({ id: userFound._id }, 'secret', {
    expiresIn: 80000
  });
  console.log(token);

  const id = userFound._id;

  req.session.userIn = userFound;
  //return res.redirect('userProfile/')
  //res.render('user/userProfile')

  //return res.redirect(`userProfile/:${userId}`)
  res.redirect('userProfile');
};

// function listUsers() {
//   return store.list();
// }

module.exports = {
  userRegister,
  userLogin
  // listUsers
  //verifyToken
};
