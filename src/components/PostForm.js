import React, { useContext } from 'react';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import { generate } from "shortid";
import * as Yup from 'yup';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const PostForm = ({ posts, id, elementName }) => {

    const { authStatus } = useContext(AuthContext)

    const galleryValidation = Yup.object({
        text: Yup.string()
            .min(1, 'Must be 15 characters or less')
            .max(250, 'Must be no longer than 250 characters')
            .required('Required'),
        images: Yup.array()
            .min(1, "Gallery requires at least 1 image")
            .max(4, '4 images or less'),
    })

    const tweetValidation = Yup.object({
        text: Yup.string()
            .min(1, 'Must be 15 characters or less')
            .max(250, 'Must be no longer than 250 characters')
            .required('Required'),
            images: Yup.string()
            .url('Invalid URL')
    })

    return authStatus && authStatus.uid === id && (
        <Formik
            initialValues={{ text: '', images: [], timestamp: new Date().toISOString(), id: generate() }}

            validationSchema={elementName === 'tweets' ? tweetValidation : galleryValidation}

            enableReinitialize={true}

            onSubmit={(values, { resetForm, initialValues }) => {
                authStatus && elementName === 'tweets' ? firebase.addTweet(id, values, posts) : firebase.addPhoto(id, values, posts)
                resetForm(initialValues)
                console.log(values)
            }}
        >{({ values }) => (
            <Form>
                <Field name='text' type='text' />
                <ErrorMessage name="text" />
                <FieldArray
                    name="images"
                    render={arrayHelpers => (
                        <div>
                            {values.images && values.images.length > 0 ? (
                                values.images.map((image, index) => (
                                    <div key={index}>
                                        <Field name={`images.${index}`} />
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.remove(index)} // remove an image from the list
                                        >
                                            <HighlightOffIcon />
                    </button>
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                        >
                                            
                                            <AddBoxIcon color='primary'/>
                    </button>
                                    </div>
                                ))
                            ) : (
                                    <button type="button" onClick={() => arrayHelpers.push("")}>
                                        {/* show this when user has removed all images from the list */}
                                        Add Image
                    </button>
                                )}
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    )}
                />
                <ErrorMessage name="images" />
                <pre>
                    <ul>
                        {values.images && values.images.map((image) => image && <li key={image}><img src={image} alt='pic' style={{ width: '100px', height: '70px', objectFit: 'cover' }} /></li>)}
                    </ul>
                </pre>
            </Form>
        )}</Formik>
    )
}