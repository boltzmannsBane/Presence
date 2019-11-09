import React from 'react';
import { NavLink as Link } from 'react-router-dom';

export const Header = () => <header>
    <img src='https://i.imgur.com/akXQeZ0.jpg' alt='avatar' style={
        { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }
    } />
    <h1>Amygdala</h1>
    <h4>23 yo trying to get some bread crumbs</h4>
    <nav>
        <Link to='/gallery'>gallery</Link>
        <Link to='/tweets'>tweets</Link>
    </nav>
</header>
