import React from "react";
import MyPDF from "../assets/downloads/vinay.pdf";
import HomeGallery from "./Home.jsx";

function Services() {
  return (
    <>
      <HomeGallery />
      <section className="mb-5 center">
        <h2 className="resume">Resume</h2>
        <div className="resume">
          Download{" "}
          <a href={MyPDF} download="My_File.pdf">
            Resume
          </a>
        </div>
        <div className="resume">
          <div className="resume">
            <h3>
              <b>UI Skills</b>
            </h3>
            <ul className="skills">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>jQuery</li>
              <li>Bootstrap</li>
              <li>Responsive Design</li>
              <li>Angular</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Jenkins</li>
              <li>Git</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
