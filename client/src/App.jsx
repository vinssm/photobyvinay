import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
// import SearchComments from './pages/SearchComments';
// import SavedComments from './pages/SavedComments';
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/Home" element={<Navigate to="/Services" replace />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path="/Services" element={<Services />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route exact path="/Contact" element={<Contact />} />
            {/* <Route exact path='/' component={SearchComments} />
          <Route exact path='/SavedComments' component={SavedComments} /> */}
            <Route exact path="/signup" element={<Signup />} />
            <Route
              render={() => (
                <h1 className="display-4">Something went Wrong!</h1>
              )}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
