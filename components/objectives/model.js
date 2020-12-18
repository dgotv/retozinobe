const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const { ObjectId } = Schema;

const objectivesSchema = new Schema(
  {
    growth_id: { type: ObjectId },
    objective: String,
    tejoPoints: Number
  },
  { timestamps: true, versionKey: false }
);

const model = mongoose.model('Objectives', objectivesSchema);
module.exports = model;
