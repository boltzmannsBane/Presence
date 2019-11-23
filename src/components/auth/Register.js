import React, { useContext, useEffect } from 'react'
import firebase from '../../firebase'
import { AuthContext } from '../context/AuthContext'
import { withRouter } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = (props) => {

    const { authStatus, setAuthStatus } = useContext(AuthContext)

    useEffect(() => { authStatus && props.history.replace(`/users/${authStatus.uid}`) }, [authStatus])

    return (<Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}

        validationSchema={Yup.object({
            name: Yup.string()
                .min(2, 'Too short')
                .max(15, '15 or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required()
                .min(6, 'Too short'),
            confirmPassword: Yup.string()
                .required('Required')
                .test('password-match', 'Passwords must match', function (value) { return this.parent.password === value })

        })}

        enableReinitialize={true}

        onSubmit={(values) => {
            firebase.register(values.name, values.email, values.password)
                .then(cred => {
                    firebase.getData('users').doc(cred.user.uid).set({
                        name: values.name,
                        avatar: '',
                        bio: '',
                        tweets: [],
                        gallery: []
                    })
                    cred && setAuthStatus(cred.user)
                    authStatus && props.history.replace(`/users/${cred.user.uid}`)
                    console.log('ayy')
                })
        }}
    >
        <Form>
            <label htmlFor="name">name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" />
            <br />
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" />
            <ErrorMessage name="email" />
            <br />
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
            <br />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field name="confirmPassword" type="password" />
            <ErrorMessage name="confirmPassword" />
            <br />
            <button type="submit">Submit</button>
        </Form>
    </Formik>)
}

export default withRouter(Register)