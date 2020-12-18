const express = require('express');
const admin = require('../../midlewares/admin');

const controller = require('./controller');

const User = require('../user/model');
const Objectives = require('../objectives/model');
const Growth = require('./model');

const router = express.Router();

router.get('/listUser', admin, async (req, res) => {
  const users = await User.find().lean();
  res.render('admin/listUser', { users });
  console.log(users);
});

router.get('/editUser/:id', admin, async (req, res) => {
  const userId = await User.findById(req.params.id).lean();
  res.render('admin/editUser', { userId });
  console.log(userId);
});

router.put('/editUser/:id', async (req, res) => {
  const { userName } = req.body;
  await User.findByIdAndUpdate(req.params.id, { userName });
  const { mail } = req.body;
  await User.findByIdAndUpdate(req.params.id, { mail });

  res.redirect('/admin/listUser');
  console.log(userName);
});

router.get('/growthPath', controller.pathCreated);

router.post('/growthPath', controller.growthPath);

router.get('/editObjectives/:id', async (req, res) => {
  const GrowthAdd = await Growth.findById(req.params.id).lean();
  console.log(GrowthAdd);
  res.render('admin/editObjectives', { GrowthAdd });
});

// router.post('/editObjectives/:id', async (req, res) => {
//   const newObjetive = await new Objectives(req.body);
//   console.log(newObjetive);
//   console.log(req.params.id);

//   res.redirect('/admin/growthPath');
// });

router.post('/editObjectives/:id', controller.objectivesAdd);

module.exports = router;
