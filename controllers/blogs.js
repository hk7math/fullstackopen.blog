const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  if ( !blog.title && !blog.url ) {
    res.status(400).end()
  } else {
    const resBlog = await blog.save()
    res.status(201).json(resBlog)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  await Blog.findByIdAndUpdate(
    req.params.id, 
    {$inc: {likes : 1}},
    {new: true},
  )
  res.status(202).end()
})

module.exports = blogsRouter