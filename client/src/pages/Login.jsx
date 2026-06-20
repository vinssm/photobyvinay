import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  if (Auth.loggedIn()) {
    return <Navigate to="/Services" replace />;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);

      setUserFormData({ email: "", password: "" });
      setValidated(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fancy-login-wrapper">
      <div className="fancy-login-card">
        <div className="fancy-login-header">
          <h2 className="fancy-login-title">Welcome Back</h2>
          <p className="fancy-login-subtitle">
            Please enter your details to sign in
          </p>
        </div>

        <Form
          noValidate
          validated={validated}
          onSubmit={handleFormSubmit}
          className="fancy-form"
        >
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
            className="fancy-alert"
          >
            Invalid email or password. Please try again.
          </Alert>

          <Form.Group controlId="loginEmail" className="fancy-form-group">
            <Form.Label className="fancy-label">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              className="fancy-input"
              required
            />
            <Form.Control.Feedback type="invalid" className="fancy-feedback">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="loginPassword" className="fancy-form-group">
            <Form.Label className="fancy-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              className="fancy-input"
              required
            />
            <Form.Control.Feedback type="invalid" className="fancy-feedback">
              Password is required!
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            className="fancy-submit-btn"
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
