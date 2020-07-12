const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, blog) => prev + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce(
      (prev, blog) => blog.likes > prev.likes
        ? {
          title: blog.title, 
          author: blog.author, 
          likes: blog.likes
        }
        : prev ,
      {
        title: blogs[0].title, 
        author: blogs[0].author, 
        likes: blogs[0].likes
      })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
