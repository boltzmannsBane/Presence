import React, { createContext, useState, useEffect } from 'react'
import firebase from '../../firebase'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {

    const [authStatus, setAuthStatus] = useState(null)
    const [userInfo, setUserInfo] = useState('')

    useEffect(() => {
        firebase.isInitialized().then(val => setAuthStatus(val))
        console.log('usefffect has fired!')
    }, [])

    // useEffect(() => authStatus ? console.log(authStatus) : console.log('not logged in'), [authStatus])

    return (
        <AuthContext.Provider value={{ authStatus, setAuthStatus, userInfo, setUserInfo }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;