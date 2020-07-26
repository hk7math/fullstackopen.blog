const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { 
      username: 1, 
      name: 1,
      id: 1,
    })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)
  const decodedToken = jwt.verify(req.token, config.SECRET)
  if (!req.token || !decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  blog.user = user.id

  if ( !blog.title && !blog.url ) {
    res.status(400).end()
  } else {
    const resBlog = await blog.save()
    user.blogs = !user.blogs ? [resBlog.id] : user.blogs.concat(resBlog.id)
    await user.save()
    
    res.status(201).json(resBlog)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, config.SECRET)
  if (!req.token || !decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  } 

  const resBlog = await Blog.findById(req.params.id)
  if (!resBlog) {
    return res.status(404).json({ error: 'blog id not found' })
  } else if (resBlog.user.toString() !== decodedToken.id.toString()) {
    return res.status(401).json({ error: 'unmatched blog and user' })
  }

  await resBlog.remove()
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