import React from "react";
import Profile from "../assets/img/profile.jpg";
import GitHubRepos from "../components/GitHubRepos.jsx";

function About() {
  return (
    <div className="container center">
      <h2>Vinay Vallabhaneni</h2>
      <div className="about-body">
        <img src={Profile} alt="Pic"></img>
        <div className="bodyTab pTag">
          <p>
            Accomplished Software Engineer and Technical Project Lead with over
            10 years of expertise bridging the gap between advanced application
            development and robust DevOps infrastructure. A proven leader in
            managing matrixed cross-functional teams, I specialize in driving
            end-to-end SDLC processes using Agile/Scrum methodologies,
            automating enterprise CI/CD pipelines (Jenkins, AWS, Git), and
            building scalable frontend applications in React and Angular. I
            excel at translating complex technical requirements into high-value
            business solutions, optimizing cloud configurations, and delivering
            critical IT initiatives on time beneath shifting priorities. I am
            eager to leverage this unique blend of full-stack engineering, cloud
            architecture, and agile project management to drive continuous
            delivery and operational excellence for your organization..
          </p>
          <div className="padding">
            <p>Vinay loves photography and coding</p>
          </div>
        </div>
      </div>
      <div className="github-repos">
        <GitHubRepos />
      </div>
    </div>
  );
}

export default About;
