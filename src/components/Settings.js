import React, { useState, useEffect, useContext } from 'react'
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'
import { withRouter } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { generate } from "shortid";

const Settings = ({ history, match: { params: { id } } }) => {

    const { userInfo, setUserInfo } = useContext(AuthContext)
    const { authStatus } = useContext(AuthContext)


    const { name, avatar } = userInfo

    useEffect(() => { console.log(userInfo, authStatus) }, [userInfo])

    return authStatus && userInfo && authStatus.uid === id ? <>

        <Formik
            initialValues={{ name: name, avatar: avatar }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Too short')
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                avatar: Yup.string()
                    .url('Invalid URL')
            })}
            onSubmit={(values) => {
                firebase.updateDisplayInfo(id, values.name, values.avatar)
                setUserInfo(values)
            }}
        >
            <Form>
                <label htmlFor="name">Display Name</label>
                <Field name="name" type="text" />
                <ErrorMessage name="name" />
                <br />
                <label htmlFor="avatar">avatar</label>
                <Field name="avatar" type="text" />
                <ErrorMessage name="avatar" />
                <br />
                <button type="submit">Submit</button>
            </Form>
        </Formik>

        <br />

        <Formik
            initialValues={{ email: authStatus.email, password: '', confirmPassword: '' }}

            validationSchema={Yup.object({
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
                firebase.updateProfile(values.email, values.password)
                history.replace(`/${id}/gallery`)
            }}
        >
            <Form>
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
        </Formik>


    </>
        : <h1>Lack of Permissions</h1>
}

export default withRouter(Settings)