const { Router } = require('express')
const commentController = require('../controller/comment')
const { isUserAuthenticated } = require('../middlewares/authenticate')

const commentRouter = Router()

commentRouter.post('/comment', isUserAuthenticated, commentController.makeComment)
// commentRouter.post('/signin', authorController.signin)

module.exports = commentRouter
