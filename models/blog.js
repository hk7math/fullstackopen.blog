const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (doc, resObj) => {
    resObj.id = resObj._id.toString()
    delete resObj._id
    delete resObj.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
