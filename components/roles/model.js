//const  {schema, model} = require ("../user/model");

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: String
  },

  { versionKey: false }
);

//export default model("Role", roleSchema)
const model = mongoose.model('Role', roleSchema);
module.exports = model;
