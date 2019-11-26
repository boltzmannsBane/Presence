import React, { createContext, useState, useEffect } from 'react'
import firebase from '../../firebase'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {

    const [authStatus, setAuthStatus] = useState(null)
    const [userInfo, setUserInfo] = useState('')

    useEffect(() => {
        firebase.isInitialized().then(val => setAuthStatus(val))
    }, [])

    return (
        <AuthContext.Provider value={{ authStatus, setAuthStatus, userInfo, setUserInfo }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;