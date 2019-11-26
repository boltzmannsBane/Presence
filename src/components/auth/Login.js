import React, { useEffect, useContext } from 'react'
import firebase from '../../firebase'
import { AuthContext } from '../context/AuthContext'
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { SubmitButton } from '../SubmitButton';
import { withRouter } from 'react-router-dom'

const Login = (props) => {

    const { authStatus, setAuthStatus } = useContext(AuthContext)

    async function Login(email, password) {
        try {
            await firebase.login(email, password).then(res => {
                props.history.replace(`/users/${res.user.uid}`)
                setAuthStatus(res.user)

            })
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => { authStatus && props.history.replace(`/users/${authStatus.uid}`) }, [authStatus])

    return <>
        <Formik
            initialValues={{ email: '', password: '' }}

            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .required()
                    .min(6, 'Too short')
            })}

            onSubmit={(values) => Login(values.email, values.password)}
        >
            <Form style={{ marginLeft: '30px' }}>
                <h1>Login</h1>
                <br />
                <Field name="email" type="text" label='email' component={TextField} style={{ marginTop: '10px', width: '50%' }} />
                <br />
                <Field name="password" type="password" label='password' component={TextField} style={{ marginTop: '10px', width: '50%' }} />
                <br />
                <SubmitButton />
            </Form>
        </Formik>
    </>

}

export default withRouter(Login)