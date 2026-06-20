import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
//import Signup from '../pages/Signup';
// import Login from './pages/Login';


const Navs= () => {

  return (
    <>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
           Photo by Vinay
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/About'>About</Nav.Link>
              <Nav.Link as={Link} to='/Services'>Services</Nav.Link>
              <Nav.Link as={Link} to='/Contact'>Contact</Nav.Link>
              {!Auth.loggedIn() && (
                <Nav.Link as={Link} to='/signup'>Signup</Nav.Link>
              )}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/Profile'>Profile</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
};

export default Navs;
