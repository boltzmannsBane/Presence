import React, { useState, useContext, useEffect } from 'react';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'
import { NavLink as Link } from 'react-router-dom';

export const Header = ({ id }) => {

    const { authStatus, setAuthStatus } = useContext(AuthContext)

    const [displayName, setDisplayName] = useState('')
    const [displayAvatar, setDisplayAvatar] = useState('')
    const [name, setName] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [edit, setEdit] = useState(false)
    const [updateStatus, setUpdateStatus] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    const Logout = () => {
        firebase.logout().then(setAuthStatus(false))
    }

    useEffect(() => {
        authStatus && firebase.getData('users').doc(id).get().then(doc => {
            const info = doc.data()
            setUserInfo(info)
            setDisplayName(info.name)
            setDisplayAvatar(info.avatar)
        })
    }, [authStatus])

    return (
        <header>
            <img src='' alt='avatar' style={
                { width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }
            } />
            <h1>{displayName}</h1>
            <h4>Bio</h4>
            <nav>
                <Link to={`/${id}/gallery`}>gallery</Link>
                <Link to={`/${id}/tweets`}>tweets</Link>
                <Link to={'/'}>login</Link>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    Logout()
                }}>
                <button>Logout</button>
                </form>
            </nav>
        </header>
    )
}
