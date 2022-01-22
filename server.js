const express = require('express')
require('dotenv').config()

const connectToDatabase = require('./utilites/connect')

// Routers
const blogRouter = require('./router/blog')
const authorRouter = require('./router/user')
const commentRouter = require('./router/comment')
const app = express()

// middlewares
app.use(express.json())
app.use('/api', blogRouter)
app.use('/api', authorRouter)
app.use('/api', commentRouter)

app.listen(4000, async () => {
  console.log(`🚀 Server ready at http://localhost:4000`)
  await connectToDatabase()
})
