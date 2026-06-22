import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Auth from "../utils/auth";
import { logoutUser } from "../store/slices/authSlice";
import { addToast } from "../store/slices/toastSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    Auth.logout();
    dispatch(logoutUser());
    dispatch(addToast({ message: "You have been logged out.", type: "info" }));
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to={isLoggedIn ? "/photo-gallery" : "/"}>
          Portfolio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ml-auto">
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/portfolio">
              Portfolio
            </Nav.Link>
            <Nav.Link as={Link} to="/services">
              Services
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/photo-gallery">
                Photo Gallery
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
