const { GraphQLID, GraphQLString, GraphQLList } = require('graphql')
const { hash } = require('bcrypt')
const { isUserAuthenticated } = require('../../services/auth')

// model
const UserModel = require('../../models/user')
const BlogModel = require('../../models/blog')
const refreshTokenModel = require('../../models/refresh-token')

// type
const BlogType = require('../type/blog')
const CommentType = require('../type/comment')
const ErrorAndTokenType = require('../type/token')

exports.signup = {
  type: ErrorAndTokenType,
  args: {
    name: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(parent, args) {
    const { name, password } = args
    try {
      // hash user password
      const hashedPassword = await hash(password, 10)

      // store in the database
      const user = await UserModel.create({ name, password: hashedPassword })

      if (user) {
        try {
          const accessToken = sign(
            {
              id: user._id,
              name: user.name
            },
            '60s'
          )

          const refreshToken = sign(
            {
              id: user._id,
              name: user.name
            },
            '1y',
            process.env.JWT_REFRESH_SECRET
          )

          await refreshTokenModel.create({ refreshToken })

          return {
            error: '',
            tokens: { accessToken, refreshToken }
          }
        } catch (err) {
          return {
            error: err.messsege,
            tokens: { accessToken, refreshToken }
          }
        }
      } else {
        return {
          error: 'User not created',
          tokens: { accessToken, refreshToken }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}

exports.createBlog = {
  type: BlogType,
  args: {
    user: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) }
  },
  async resolve(parent, args, context) {
    const isAuthenticated = await isUserAuthenticated(context.req.cookies.tokens)
    if (isAuthenticated) {
      const { user, title, description, tags } = args
      const blogObj = { user, title, description, tags }
      const blog = await BlogModel.create(blogObj)
      return blog
    } else {
      return 'Unauthorized user'
    }
  }
}

exports.makeComment = {
  type: CommentType,
  args: {
    user: { type: GraphQLID },
    blog: { type: GraphQLID },
    body: { type: GraphQLString }
  },
  async resolve(parent, args) {
    const isAuthenticated = await isUserAuthenticated(context.req.cookies.tokens)
    if (isAuthenticated) {
      return await Comment.create(args)
    } else {
      return 'Unauthorized user'
    }
  }
}

exports.deleteBlogById = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(parent, args, context) {
    const isAuthenticated = await isUserAuthenticated(context.req.cookies.tokens)
    if (isAuthenticated) {
      const { id } = args
      const blog = await BlogModel.deleteOne({ _id: id })
      if (blog.deletedCount) {
        return 'Blog deleted'
      }

      return 'Blog not found'
    } else {
      return 'Unauthorized user'
    }
  }
}

exports.logOut = {
  type: GraphQLString,
  async resolve(parent, args, context) {
    try {
      const { refreshToken } = JSON.parse(context.cookies.tokens)
      await refreshTokenModel.findOneAndDelete({ refreshToken })
      return 'You are logout!'
    } catch (err) {
      console.log(err)
      return 'Somethin wrong'
    }
  }
}
