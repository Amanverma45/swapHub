const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: String,
  profileImage: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ]
})
const User = mongoose.model('user', userSchema)
module.exports = User;