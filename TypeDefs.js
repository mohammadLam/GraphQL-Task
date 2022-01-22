const { buildSchema, GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql')

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})

const Blog = new GraphQLObjectType({
  name: 'Blog',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: User },
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  })
})

module.exports = buildSchema(`
  type Query {
    getAllUser: [User]!
    getAllBlogs: [Blog]!
    getBlogById(id: ID!): Blog!
    getBlogByUserId(user_id: ID!): [Blog!]!
    SignIn(authObj: SignInInput!): Tokens!
  }

  type Mutation {
    signup(userObj: signUpInput!): User!
    createBlog(blogObj: createBlogInput): Blog!
    makeComment(commentObj: makeCommentInput): Comment!
    deleteBlogById(id: ID!): String!
  }

  type User {
    id: ID!
    name: String!
    password: String!
  }

  type Blog {
    id: ID!
    user: User!
    title: String!
    description: String!
    tags: [String!]!
    comments: [Comment]!
  }

  type Comment {
    user: User
    blog: Blog
    body: String!
  }

  input signUpInput {
    name: String!
    password: String!
  }

  input createBlogInput {
    user: ID!
    title: String!
    description: String!
    tags: [String!]!
  }

  input makeCommentInput {
    user: ID!
    blog: ID!
    body: String!
  }

  input SignInInput {
    name: String!
    password: String!
  }

  type Tokens {
    userError: [String]!
    tokens: TokenObject!
  }

  type TokenObject {
    accessToken: String
    refreshToken: String
  }
`)
