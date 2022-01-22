const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      min: 5,
      unique: true,
      required: true
    },
    password: {
      type: String,
      min: 8,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = new model('user', userSchema)
