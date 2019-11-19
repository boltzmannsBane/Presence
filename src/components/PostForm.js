import React, { useContext } from 'react';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const PostForm = ({ posts, id, elementName }) => {

    const { authStatus } = useContext(AuthContext)

    function generateId() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    return authStatus && (
        <Formik
            initialValues={{ text: '', timestamp: new Date().toISOString(), id: generateId(), images: [] }}

            validationSchema={Yup.object({
                text: Yup.string()
                    .min(15, 'Must be 15 characters or less')
                    .max(250, 'Must be no longer than 250 characters')
                    .required('Required'),
                images: Yup.string()
                    .min(10, 'Invalid URL')
                    .url('Invalid URL')
            })}

            onSubmit={(values, { resetForm }) => {
                authStatus && elementName === 'tweets' ? firebase.addTweet(id, values, posts) : firebase.addPhoto(id, values, posts)
                resetForm({ text: '', timestamp: new Date().toISOString(), id: generateId(), images: [] })
            }}
            render={({ values }) => (
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
                                            <Field name={`images.${index}`}/>
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)} // remove an image from the list
                                            >
                                                -
                        </button>
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                            >
                                                +
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
                            {values.images && values.images.map(image => image && <li><img src={image} alt='pic' style={{ width: '100px', height: '70px', objectFit: 'cover' }} /></li>)}
                        </ul>
                    </pre>
                </Form>
            )}
        />
    )
}