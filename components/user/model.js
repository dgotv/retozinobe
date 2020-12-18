const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

//const name = "fullName",
const userSchema = new Schema(
  {
    userName: String,

    mail: String,
    password: String,
    confirmPassword: String,
    roles: [
      {
        ref: 'Role',
        type: Schema.Types.ObjectId
      }
    ]
  },
  { timestamps: true, versionKey: false }
);
console.log('esquema exitoso');

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

const model = mongoose.model('User', userSchema);
module.exports = model;
