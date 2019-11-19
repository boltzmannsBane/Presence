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
            const { text, timestamp, images } = gallery.filter(obj => obj.id === postId)[0]
            setPost({ text, timestamp, images })
            setAllPosts(gallery)
        }

        getPost()
    }, [])

    return post && (
        <Fragment>
            <p>{post.timestamp}</p>
            <h1>{post.text}</h1>
            {post.images && <img src={post.images[0]} alt='post' style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>}
            <button onClick={(e) => {
                e.preventDefault()
                Delete(postId)
                history.replace(`/${id}/gallery`)
            }}>DELETE</button>
        </Fragment>
    )
}

export default withRouter(GalleryPost)