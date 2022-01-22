const { Schema, model } = require('mongoose')

const refreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true
  }
})

module.exports = new model('refreshToken', refreshTokenSchema)
