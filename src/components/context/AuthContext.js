import React, { createContext, useState, useEffect } from 'react'
import firebase from '../../firebase'
import App from '../../App'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {

    const [authStatus, setAuthStatus] = useState(false)

    useEffect(() => {
        firebase.isInitialized().then(val => val && setAuthStatus(true))
    })

    return (
        <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;