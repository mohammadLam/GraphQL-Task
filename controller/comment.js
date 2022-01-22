const CommentModel = require('../models/comment')
const BlogModel = require('../models/blog')

const commentController = {
  async makeComment(req, res) {
    // blog means blogId || user means user id
    const { blog, body } = req.body
    const user = req.user
    const Comment = new CommentModel({
      blog,
      user,
      body
    })

    try {
      // store comment in database
      await Comment.save()

      // store created comment id on blog collection
      const Blog = await BlogModel.findOneAndUpdate(
        {
          _id: blog
        },
        {
          $push: {
            comments: Comment._id
          }
        }
      )
      return res.json(Blog)
    } catch (err) {
      return res.json(err)
    }
  }
}

module.exports = commentController
