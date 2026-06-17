const typeDefs = `#graphql 
  type Mutation { 
    login(email: String!, password: String!): Auth 
    addUser(username: String!, email: String!, password: String!): Auth 
    saveComment(commentData: CommentInput!): User 
    removeComment(commentId: ID!): User 
  } 

  type User { 
    _id: ID! 
    username: String! 
    email: String 
    commentCount: Int 
    savedComments: [Comment] 
  } 

  type Comment { 
    commentId: ID! 
    authors: [String] 
    description: String 
    image: String 
    link: String 
    title: String! 
  } 

  input CommentInput { 
    authors: [String] 
    description: String! 
    commentId: String! 
    image: String 
    link: String 
    title: String! 
  } 

  type Query { 
    me: User 
  } 

  type Auth { 
    token: ID! 
    user: User 
  } 
`;

module.exports = typeDefs;
