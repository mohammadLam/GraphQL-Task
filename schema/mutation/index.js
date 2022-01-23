const { GraphQLID, GraphQLString, GraphQLList } = require('graphql')
const { hash } = require('bcrypt')
const { isUserAuthenticated } = require('../../services/auth')

// model
const UserModel = require('../../models/user')
const BlogModel = require('../../models/blog')
const refreshTokenModel = require('../../models/refresh-token')
const { sign, decode } = require('../../services/jwt')

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
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) }
  },
  async resolve(parent, args, context) {
    const isAuthenticated = await isUserAuthenticated(context.req.cookies.tokens)
    if (isAuthenticated) {
      const { accessToken } = JSON.parse(context.req.cookies.tokens)
      const { id: user } = decode(accessToken)
      const { title, description, tags } = args
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
    blog: { type: GraphQLID },
    body: { type: GraphQLString }
  },
  async resolve(parent, args) {
    const { blog, body } = args
    const isAuthenticated = await isUserAuthenticated(context.req.cookies.tokens)
    if (isAuthenticated) {
      const { accessToken } = JSON.parse(context.req.cookies.tokens)
      const { id: user } = decode(accessToken)
      return await Comment.create({ user, blog, body })
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
      const { accessToken } = JSON.parse(context.req.cookies.tokens)
      const { id: user } = decode(accessToken)
      const blog = await BlogModel.findOneAndDelete({ _id: id, user })
      if (blog) {
        return 'Blog deleted'
      }

      return 'Your Blog not found'
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
