const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
  email: { type: String, required: [true, 'email required'], trim: true, unique: true, sparse: true },
  password: { type: String, required: [true, 'password required'] },
  avatar: { type: String },
  username: { type: String, trim: true, unique: true, sparse: true },
  fullname: { type: String },
  admin: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  settings: { type: mongoose.Schema.Types.Mixed, defualt: {exchanges: []} }
})

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('user', userSchema)
