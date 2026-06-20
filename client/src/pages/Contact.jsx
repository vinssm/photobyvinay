import React, { useState } from "react";
import { validateEmail, capitalizeFirstLetter } from "../utils/helpers";

function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") {
      const isValid = validateEmail(value);
      if (!isValid) {
        error = "Please enter a valid email";
      }
    } else {
      if (!value.trim().length) {
        error = `${capitalizeFirstLetter(name)} is required`;
      }
    }

    setErrorMessage(error);

    // If there's no error found during this blur event, update the form state
    if (!error) {
      setFormState({ ...formState, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Prevent submission if fields are empty or there is an active error
    if (
      !formState.name ||
      !formState.email ||
      !formState.message ||
      errorMessage
    ) {
      setErrorMessage(
        "Please fill out all fields correctly before submitting.",
      );
      return;
    }

    try {
      const response = await fetch(`/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const resData = await response.json();

      if (resData.status === "success") {
        alert("Message Sent!");
        // Clear form on success
        setFormState({ name: "", email: "", message: "" });
        e.target.reset();
      } else {
        alert("Message failed to send");
      }
    } catch (err) {
      console.error("Error: ", err);
      alert("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="page-div">
      <h2 className="center padTop">Contact Me</h2>
      <form className="form pBody" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="fancy">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="contact-el"
            defaultValue={formState.name}
            onBlur={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="fancy">
            Email address:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="contact-el"
            defaultValue={formState.email}
            onBlur={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="fancy">
            Message:
          </label>
          <textarea
            name="message"
            id="message"
            className="contact-el"
            defaultValue={formState.message}
            onBlur={handleChange}
            rows="5"
          />
        </div>

        {errorMessage && (
          <div className="error-container">
            <p className="errorMsg">{errorMessage}</p>
          </div>
        )}

        <button type="submit" className="submit-contact fancy">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
