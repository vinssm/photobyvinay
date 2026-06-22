import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import NavBar from "./components/NavBar.jsx";
import ToastContainer from "./components/ToastContainer.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import PhotoGalleryPage from "./pages/PhotoGalleryPage.jsx";
import Portfolio from "./pages/Portfolio.jsx";
// import SearchComments from './pages/SearchComments';
// import SavedComments from './pages/SavedComments';
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <>
            <NavBar />
            <ToastContainer />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/Home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/services" element={<Services />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route
                exact
                path="/photo-gallery"
                element={<PhotoGalleryPage />}
              />
              {/* <Route exact path='/' component={SearchComments} />
          <Route exact path='/SavedComments' component={SavedComments} /> */}
              <Route exact path="/portfolio" element={<Portfolio />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route
                path="*"
                element={<h1 className="display-4">Something went Wrong!</h1>}
              />
            </Routes>
          </>
        </Router>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
