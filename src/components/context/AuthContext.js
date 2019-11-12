import React, { createContext, useState, useEffect } from 'react'
import firebase from '../../firebase'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {

    const [authStatus, setAuthStatus] = useState(false)

    useEffect(() => {
        firebase.isInitialized().then(val => val && setAuthStatus(true))
    })

    useEffect(() => authStatus ? console.log('logged in') : console.log('not logged in'), [authStatus])

    return (
        <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;