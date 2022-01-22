const { Router } = require('express')
const authorController = require('../controller/user')

const authorRouter = Router()

authorRouter.post('/signup', authorController.signup)
authorRouter.post('/signin', authorController.signin)

module.exports = authorRouter
