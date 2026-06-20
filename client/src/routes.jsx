import React from 'react';

import Home from './components/Home'
import About from './components/About';
import Services from './components/Services';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';

// import createComment from './components/createComment';


export const routes = [
    {path:"/",element:<Home />},
    {path:"/Home",element:<Home />},
    {path:"/About",element:<About />},
    {path:"/Services",element:<Services />},
    {path:"/Profile",element:<Profile />},
    {path:"/Contact",element:<Contact />},
    {path:"/login",element:<Login />},
    {path:"/Signup",element:<Signup />},
    // {path:"/createComment",element:<createComment />},
]