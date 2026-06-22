import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_Comment = gql`
  mutation saveComment($commentData: CommentInput!) {
    saveComment(commentData: $commentData) {
      _id
      username
      email
      savedComments {
        commentId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_Comment = gql`
  mutation removeComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
      _id
      username
      email
      savedComments {
        commentId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const ADD_PHOTO = gql`
  mutation addPhoto($title: String!, $imageUrl: String!, $description: String) {
    addPhoto(title: $title, imageUrl: $imageUrl, description: $description) {
      _id
      title
      imageUrl
      description
      likeCount
      commentCount
      userLikes
      comments {
        _id
        author
        text
        createdAt
      }
      createdAt
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($photoId: ID!) {
    toggleLike(photoId: $photoId) {
      _id
      title
      imageUrl
      likeCount
      userLikes
      commentCount
      comments {
        _id
        author
        authorId
        text
        createdAt
      }
    }
  }
`;

export const ADD_PHOTO_COMMENT = gql`
  mutation addPhotoComment($photoId: ID!, $text: String!) {
    addPhotoComment(photoId: $photoId, text: $text) {
      _id
      photoId
      author
      authorId
      text
      createdAt
    }
  }
`;

export const DELETE_PHOTO_COMMENT = gql`
  mutation deletePhotoComment($photoCommentId: ID!) {
    deletePhotoComment(photoCommentId: $photoCommentId) {
      _id
      title
      imageUrl
      likeCount
      commentCount
      comments {
        _id
        author
        authorId
        text
        createdAt
      }
    }
  }
`;

