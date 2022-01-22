const { Schema, model, Types } = require('mongoose')

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      required: true
    },
    user: {
      type: Types.ObjectId,
      ref: 'user',
      required: true
    },
    comments: {
      type: [
        {
          type: Types.ObjectId,
          ref: 'comment',
          required: true
        }
      ]
    }
  },
  {
    timestamps: true
  }
)

module.exports = new model('blog', blogSchema)
