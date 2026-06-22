import React, { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveCommentIds, getSavedCommentIds } from '../utils/localStorage';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_Comment } from '../utils/mutations';

const SearchComments = () => {
  // create state for holding returned google api data
  const [searchedComments, setSearchedComments] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved commentId values
  const [savedCommentIds, setSavedCommentIds] = useState(getSavedCommentIds());

  const [saveComment, { error }] = useMutation(SAVE_Comment);

  // set up useEffect hook to save `savedCommentIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCommentIds(savedCommentIds);
  });

  // create method to search for comments and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/comments/v1/volumes?q=${searchInput}`);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const commentData = items.map((comment) => ({
        commentId: comment.id,
        authors: comment.volumeInfo.authors || ['No author to display'],
        title: comment.volumeInfo.title,
        description: comment.volumeInfo.description,
        image: comment.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedComments(commentData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a comment to our database
  const handleSaveComment = async (commentId) => {
    // find the comment in `searchedComments` state by the matching id
    const commentToSave = searchedComments.find((comment) => comment.commentId === commentId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveComment({
        variables: { commentData: { ...commentToSave } },
      });
      console.log(savedCommentIds);
      setSavedCommentIds([...savedCommentIds, commentToSave.commentId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Comments!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a comment'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron> */}

      <Container>
        {/* <h2>
          {searchedComments.length
            ? `Viewing ${searchedComments.length} results:`
            : 'Search for a comment to begin'}
        </h2>
        <CardColumns>
          {searchedComments.map((comment) => {
            return (
              <Card key={comment.commentId} border='dark'>
                {comment.image ? (
                  <Card.Img src={comment.image} alt={`The cover for ${comment.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{comment.title}</Card.Title>
                  <p className='small'>Authors: {comment.authors}</p>
                  <Card.Text>{comment.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedCommentIds?.some((savedCommentId) => savedCommentId === comment.commentId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveComment(comment.commentId)}>
                      {savedCommentIds?.some((savedCommentId) => savedCommentId === comment.commentId)
                        ? 'This comment has already been saved!'
                        : 'Save this Comment!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns> */}
      </Container>
    </>
  );
};

export default SearchComments;
