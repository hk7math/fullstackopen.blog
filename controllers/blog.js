const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  await Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  if ( !blog.title && !blog.url ) {
    res.status(400).end()
  } else {
    await blog
      .save()
      .then(result => {
        res.status(201).json(result)
      })
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter