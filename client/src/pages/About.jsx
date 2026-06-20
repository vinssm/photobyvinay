
import React from 'react';
import Profile from "../assets/img/profile.jpg";

function About() {
  return (
    <div className="container center">
      <h2>About Me</h2>
      <div className="about-body">

      <img src={Profile} alt="Pic"></img>
        <div className="bodyTab pTag">
          <h3>Vinay Vallabhaneni</h3>
          <p>The essence of photography is for the photographer to share the world through their eyes; 
            a way for their viewers to see what they feel and evoke a similar or same emotion. 
            To capture people or places we will not see again. Think about a time that you saw a photograph, 
            maybe one that was taken of a beloved relative during an event like a casual family gathering. 
            Think about all the emotions you felt while looking at that one simple photo. Certainly there were many and you 
            felt what the photographer was feeling.
          </p>
          <div className='padding'>
            <p>Vinay loves photography and coding</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;