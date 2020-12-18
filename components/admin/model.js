const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const growthSchema = new Schema(
  {
    title: String,
    description: String
  },
  { timestamps: true, versionKey: false }
);

const model = mongoose.model('Growth', growthSchema);
module.exports = model;
