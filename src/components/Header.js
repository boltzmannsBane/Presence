import React, { useContext, useEffect } from 'react';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'
import { NavLink as Link } from 'react-router-dom';

export const Header = ({ id }) => {

    const { authStatus } = useContext(AuthContext)

    return (
        <header>
            <img src='' alt='avatar' style={
                { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }
            } />
            <h1>Name</h1>
            <h4>Bio</h4>
            <nav>
                <Link to={`/${id}/gallery`}>gallery</Link>
                <Link to={`/${id}/tweets`}>tweets</Link>
                <Link to={'/'}>login</Link>
                {/* <form onSubmit={(e) => {
                    e.preventDefault()
                    logout()
                }}>
                <button>Logout</button>
                </form> */}
            </nav>
        </header>
    )
}
