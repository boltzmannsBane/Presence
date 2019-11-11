import React, { useState, useContext, Fragment } from 'react'
import firebase from '../../firebase'

const Register = (props) => {

    // const { authStatus, setAuthStatus } = useContext(AuthContext)

    const [user, setUser] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function register() {
        try {
            await firebase.register(name, email, password)
            // setAuthStatus(true)
            setUser(true)
            props.history.replace('/')
        } catch(err) {
            alert(err)
            setName('')
            setEmail('')
            setPassword('')
        }
    }

    return (
        <Fragment>
            <div className='auth'>
                <div className='authUI'>
                    <form onSubmit={e => {
                        e.preventDefault()
                        register()
                        setName('')
                        setEmail('')
                        setPassword('')
                    }}>
                        <input
                            type="text"
                            value={name}
                            name="display name"
                            placeholder="display name"
                            onChange={e => { setName(e.target.value) }}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            value={email}
                            name="email"
                            placeholder="email"
                            onChange={e => setEmail(e.target.value)}
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
                    {user && <h1>{'Successfully signed up!'}</h1>}
                </div>
            </div>
        </Fragment>
    )
}

export default Register