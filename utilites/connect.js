const { connect } = require('mongoose')

const connectToDatabase = async () => {
  try {
    await connect('mongodb://localhost:27017/blogsite')
    console.log('Database connected')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectToDatabase
