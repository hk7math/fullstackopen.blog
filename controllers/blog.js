const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  if ( !blog.title && !blog.url ) {
    res.status(400).end()
  } else {
    blog
      .save()
      .then(result => {
        res.status(201).json(result)
      })
  }
})

module.exports = blogsRouter