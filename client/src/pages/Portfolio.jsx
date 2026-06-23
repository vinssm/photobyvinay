import React from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  return (
    <section className="page-div">
      <h2 className="center padTop">Portfolio</h2>
      <div className="pBody">
        <p>Explore the latest photo collection in the gallery.</p>
        <Link to="/photo-gallery" className="link">
          Open Photo Gallery
        </Link>
      </div>
    </section>
  );
};

export default Portfolio;
