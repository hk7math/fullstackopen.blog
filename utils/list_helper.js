const dummy = () => 1

const totalLikes = blogs => 
  blogs.reduce((prev, blog) => prev + blog.likes, 0)

const favoriteBlog = blogs => 
  blogs.length === 0
    ? {}
    : blogs.reduce((prev, blog) => 
      blog.likes > prev.likes
        ? {
          title: blog.title, 
          author: blog.author, 
          likes: blog.likes,
        }
        : prev ,
    {
      title: blogs[0].title, 
      author: blogs[0].author, 
      likes: blogs[0].likes,
    })

const mostBlogs = blogs =>{
  const blogNum = blogs.reduce((prev, blog) => {
    if (blog.author in prev) {
      prev[blog.author]+=1
    }else{
      prev[blog.author]=1
    }
    return prev
  }, {})
  return Object.keys(blogNum)
    .reduce((prev, author) => 
      blogNum[author] > prev.blogs
        ? {
          author: author,
          blogs: blogNum[author],
        }
        : prev, 
    {
      author: '',
      blogs: 0,
    })
}

const mostLikes = blogs =>{
  const likeNum = blogs.reduce((prev, blog) => {
    if (blog.author in prev) {
      prev[blog.author]+=blog.likes
    }else{
      prev[blog.author]=blog.likes
    }
    return prev
  }, {})
  return Object.keys(likeNum)
    .reduce((prev, author) => 
      likeNum[author] > prev.likes
        ? {
          author: author,
          likes: likeNum[author],
        }
        : prev, 
    {
      author: '',
      likes: 0,
    })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
