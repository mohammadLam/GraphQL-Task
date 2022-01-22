const BlogModel = require('../models/blog')

const blogController = {
  async createBlog(req, res) {
    // user means userId
    const { title, description, user, tags } = req.body
    const Blog = new BlogModel({
      title,
      description,
      tags,
      user
    })

    try {
      const post = await Blog.save()
      return res.json(post)
    } catch (err) {
      return res.json({
        error: err
      })
    }
  },

  async getAllPost(req, res) {
    try {
      const Blogs = await BlogModel.find({})
        .populate('user', 'name')
        .populate('comments', 'body')
        .select('-__v -updatedAt')
      return res.json(Blogs)
    } catch (err) {
      return res.json(err)
    }
  },

  async getPostById(req, res) {
    const { id } = req.params
    try {
      const Blog = await BlogModel.findOne({ _id: id })
        .populate('author', 'name')
        .populate('comments', 'body')
        .select('-__v -updatedAt')

      return res.json(Blog)
    } catch (err) {
      return res.json(err)
    }
  },

  async deleteBlogById(req, res) {
    const { id } = req.params
    const userId = req.user
    console.log(userId)

    const query = await BlogModel.deleteOne({ _id: id, user: userId })

    if (query.deletedCount) {
      return res.json({
        success: 'Blog deleted'
      })
    } else {
      return res.json({
        error: 'Your blog not found'
      })
    }
  },

  async updateBlogById(req, res) {
    // id means blogId
    const { title, description, id, tags } = req.body
    const userId = req.user

    try {
      const post = await BlogModel.findOneAndUpdate(
        { _id: id, user: userId },
        {
          title,
          description,
          tags
        },
        { new: true }
      )

      // if post founded
      if (post) {
        return res.json(post)
      } else {
        return res.json({
          error: 'Your blog not found'
        })
      }
    } catch (err) {
      return res.json({
        error: err
      })
    }
  }
}

module.exports = blogController
