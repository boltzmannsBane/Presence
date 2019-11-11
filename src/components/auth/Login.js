import React, { useState, Fragment } from 'react'
import firebase from '../../firebase'

const Login = (props) => {


    const [user, setUser] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login() {
        try {
            await firebase.login(email, password)
            // setAuthStatus(true)
            setUser(true)
            props.history.replace('/')

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
                    {user && <h1>{'Successfully logged in'}</h1>}
                </div>
            </div>
        </Fragment>
    )
}

export default Login