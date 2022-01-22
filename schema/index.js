const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const { getAllUsers, getAllBlogs, getBlogById, getBlogByUserId, signIn } = require('./query')
const { signup, createBlog, makeComment, deleteBlogById, logOut } = require('./mutation')

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getAllUsers,
    getAllBlogs,
    getBlogById,
    getBlogByUserId,
    signIn
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup,
    createBlog,
    makeComment,
    deleteBlogById,
    logOut
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
