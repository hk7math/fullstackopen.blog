const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, blog) => prev + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}