const typeDefs = `#graphql 
  type Mutation { 
    login(email: String!, password: String!): Auth 
    addUser(username: String!, email: String!, password: String!): Auth 
    saveComment(commentData: CommentInput!): User 
    removeComment(commentId: ID!): User 
    addPhoto(title: String!, imageUrl: String!, description: String): Photo
    toggleLike(photoId: ID!): Photo
    addPhotoComment(photoId: ID!, text: String!): PhotoComment
    deletePhotoComment(photoCommentId: ID!): Photo
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

  type Photo {
    _id: ID!
    title: String!
    imageUrl: String!
    description: String
    likeCount: Int
    commentCount: Int
    userLikes: [ID]
    comments: [PhotoComment]
    createdAt: String
  }

  type PhotoComment {
    _id: ID!
    photoId: ID!
    author: String!
    authorId: ID!
    text: String!
    createdAt: String!
    photo: Photo
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
    photos: [Photo]
    photo(id: ID!): Photo
    myPhotoComments: [PhotoComment]
  } 

  type Auth { 
    token: ID! 
    user: User 
  } 
`;

module.exports = typeDefs;
