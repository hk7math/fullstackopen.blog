const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (doc, resObj) => {
    resObj.id = resObj._id.toString()
    delete resObj._id
    delete resObj.__v
    delete resObj.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User