const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (doc, resObj) => {
    resObj.id = resObj._id.toString()
    delete resObj._id
    delete resObj.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
