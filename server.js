const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const schema = require('./schema/index')

// Database connection function
const connectToDatabase = require('./utilites/connect')

const app = express()
app.use(cookieParser())
app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: { req, res }
  }))
)

app.listen(4000, async () => {
  console.log('Now browse to http://localhost:4000/graphql')
  await connectToDatabase()
})
