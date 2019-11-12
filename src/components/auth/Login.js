import React, { useState, useContext, Fragment } from 'react'
import firebase from '../../firebase'
import { AuthContext } from '../context/AuthContext'
import { withRouter } from 'react-router-dom'

const Login = (props) => {

    const { authStatus, setAuthStatus } = useContext(AuthContext)

    const [user, setUser] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
        try {
            await firebase.login(email, password).then(res => res && props.history.replace(`/${res.user.uid}`))
            setAuthStatus(true)
            setUser(true)
        } catch (error) { alert(error.message) }
    }
    
    return (
        <Fragment>
            <div className='auth'>
                <div className='authUI'>
                    <form onSubmit={e => {
                            e.preventDefault()
                            login()
                            setEmail('')
                            setPassword('')
                        }}>
                        <input
                            type="email"
                            value={email}
                            name="email"
                            placeholder="email"
                            onChange={e => { setEmail(e.target.value) }}
                            required
                        />
                        <br />
                        <input
                            type="password"
                            value={password}
                            name="password"
                            placeholder="password"
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <button>Submit</button>
                    </form>
                    <div className='break'></div>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(Login)