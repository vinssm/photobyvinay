import React from 'react'

export default function Profile() {


  return (
    <div className='container multi-container'>
         <div>
             <img src={`https://robohash.org/random.png?size=200x200`} alt="pic" />
             <h5>Vinay Vallabhaneni</h5>
         </div>
         <div>Comments Section</div>
         <blockquote>
             <h6>My Comments</h6>
             <p>Vinay</p>
         </blockquote>
    </div>
  )
}
