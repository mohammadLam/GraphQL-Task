const { Schema, model, Types } = require('mongoose')

const commentSchema = new Schema(
  {
    blog: {
      type: Types.ObjectId,
      ref: 'blog',
      required: true
    },
    user: {
      type: Types.ObjectId,
      ref: 'autor',
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = new model('comment', commentSchema)
