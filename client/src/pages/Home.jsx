import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <section className="mainStyle center">
      <h1 className="fancy">Photo by Vinay</h1>
      <p className="pTag">
        A portfolio of photography, full-stack development, and creative work.
      </p>
      <div className="padding">
        <Link to="/portfolio" className="link">
          View Portfolio
        </Link>
      </div>
    </section>
  );
};

export default Home;
