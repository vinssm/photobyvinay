import gql from "graphql-tag";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      commentCount
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

export const QUERY_PHOTOS = gql`
  {
    photos {
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
        authorId
        text
        createdAt
      }
      createdAt
    }
  }
`;

export const QUERY_MY_PHOTO_COMMENTS = gql`
  query MyPhotoComments {
    myPhotoComments {
      _id
      text
      createdAt
      photo {
        _id
        title
        imageUrl
      }
    }
  }
`;

export const QUERY_PHOTO = gql`
  query photo($id: ID!) {
    photo(id: $id) {
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
        authorId
        text
        createdAt
      }
      createdAt
    }
  }
`;
