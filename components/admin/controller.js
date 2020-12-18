const Growth = require('./model');
const Objectives = require('../objectives/model');

const growthPath = async (req, res) => {
  const { title, description } = req.body;

  const newGrowth = await new Growth({
    title,
    description
  });
  const growthSaved = await newGrowth.save();

  return res.redirect('/admin/growthPath');
};

const pathCreated = async (req, res) => {
  const pathList = await Growth.find();
  return res.render('admin/growthPath', { pathList });
};

const objectivesAdd = async (req, res) => {
  const growthFound = await Growth.findById(req.params.id).lean();

  if (growthFound) {
    const newObjetive = await new Objectives(req.body);
    newObjetive.growth_id = growthFound._id;
    await newObjetive.save();
    console.log(newObjetive);
  }

  return res.render('admin/editObjectives');
};
module.exports = { growthPath, pathCreated, objectivesAdd };
