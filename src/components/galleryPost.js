import React, { useState, useEffect, Fragment } from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom';

const GalleryPost = ({ history, match: { params: { id, postId } } }) => {

    const [post, setPost] = useState({})
    const [allPosts, setAllPosts] = useState([])

    const Delete = async (deleteId) => {
        return firebase.getData('users').doc(id).update({
            gallery: allPosts.filter(post => post.id !== deleteId)
        })
    }

    useEffect(() => {
        const getPost = async () => {
            const data = await firebase.getData('users').doc(id).get()
            const { gallery } = data.data()
            const { text, timestamp } = gallery.filter(obj => obj.id === postId)[0]
            setPost({ text, timestamp })
            setAllPosts(gallery)
        }

        getPost()
    }, [])

    return (
        <Fragment>
            <p>{post.timestamp}</p>
            <h1>{post.text}</h1>
            <button onClick={(e) => {
                e.preventDefault()
                Delete(postId)
                history.replace(`/${id}/gallery`)
            }}>DELETE</button>
        </Fragment>
    )
}

export default withRouter(GalleryPost)