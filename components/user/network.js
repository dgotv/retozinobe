const { json } = require('body-parser');
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Role = require('../roles/model');

const User = require('./model');

const admin = require('../../midlewares/authJwt');

const authJwt = require('../../midlewares/authJwt');

router.get('/', (req, res) => {
  res.render('home.hbs');
});

router.get('/user/register', function (req, res) {
  res.render('user/register');
});

router.post('/user/register', async (req, res) => {
  console.log(req.body);
  try {
    controller.userRegister(
      req.body.userName,
      req.body.mail,
      req.body.password,
      req.body.confirmPassword,
      req.body.roles
    );
    await ((data) => {
      response.success(req, res, data, 201);
    });
  } catch (error) {
    response.error(req, res, 'Internal error', 500, err);
  }
  res.redirect('login');
});

router.get('/user/login', function (req, res) {
  res.render('user/login');
});

router.post('/user/login', controller.userLogin);

router.get('/user/listUser', async (req, res) => {
  // const users = await User.find().lean();
  // res.render("admin/listUser", {users});
  // console.log(users)
});

router.get('/user/userProfile', async (req, res) => {
  // let id = req.params.id
  console.log(req.session.userIn);

  const user = await req.session.userIn;

  res.render('user/userProfile', { user });
});

module.exports = router;

router.get;
