import React, { useState, useContext, useEffect } from 'react';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'
import { NavLink as Link } from 'react-router-dom';

export const Header = ({ id }) => {

    const { authStatus, setAuthStatus } = useContext(AuthContext)
    const { userInfo, setUserInfo } = useContext(AuthContext)

    useEffect(() => {
         firebase.getData('users').doc(id).get().then(doc => {
            const info = doc.data()
            const { name, avatar, bio } = info
            setUserInfo({name, avatar, bio})
        }).catch(err => console.log(err))
    }, [authStatus])

    return (
        <header>
            <img src={userInfo.avatar ? userInfo.avatar : 'https://i.pinimg.com/564x/38/55/96/385596c2d02cf1221d1532b877212413.jpg'} alt='avatar' style={
                { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }
            } />
            {<h1>{userInfo.name}</h1>}
            {<h4>{userInfo.bio}</h4>}
            <nav>
                <Link to={`/users/${id}/gallery`}>gallery</Link>
                <Link to={`/users/${id}/tweets`}>tweets</Link>
            </nav>
        </header>
    )
}
