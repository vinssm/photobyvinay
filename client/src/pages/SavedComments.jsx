import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_Comment } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeCommentId } from '../utils/localStorage';

const SavedComments = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeComment, { error }] = useMutation(REMOVE_Comment);

  const userData = data?.me || {};

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;


  // create function that accepts the comment's mongo _id value as param and deletes the comment from the database
  const handleDeleteComment = async (commentId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeComment({
        variables: { commentId },
      });

      // upon success, remove comment's id from localStorage
      removeCommentId(commentId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing {userData.username}'s saved comments!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
        {userData.savedComments?.length
            ? `Viewing ${userData.savedComments.length} saved ${
                userData.savedComments.length === 1 ? 'comment' : 'comments'
              }:`
            : 'You have no saved comments!'}
        </h2>
        <CardColumns>
          {userData.savedComments?.map((comment) => {
            return (
              <Card key={comment.commentId} border='dark'>
                {comment.image ? (
                  <Card.Img src={comment.image} alt={`The cover for ${comment.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{comment.title}</Card.Title>
                  <p className='small'>Authors: {comment.authors}</p>
                  <Card.Text>{comment.description}</Card.Text>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteComment(comment.commentId)}>
                    Delete this comment!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedComments;
