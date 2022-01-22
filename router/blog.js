const { Router } = require('express')
const blogController = require('../controller/blog')
const commentController = require('../controller/comment')
const { isUserAuthenticated } = require('../middlewares/authenticate')

const blogRouter = Router()

blogRouter.post('/blog', isUserAuthenticated, blogController.createBlog)
blogRouter.get('/blog/:id', blogController.getPostById)
blogRouter.put('/blog', isUserAuthenticated, blogController.updateBlogById)
blogRouter.delete('/blog/:id', isUserAuthenticated, blogController.deleteBlogById)

blogRouter.get('/blog', blogController.getAllPost)
blogRouter.post('/blog/comment', commentController.makeComment)

module.exports = blogRouter
