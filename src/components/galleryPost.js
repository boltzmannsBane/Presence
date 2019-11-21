import React, { useState, useEffect, useContext, Fragment } from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom';
import { SimpleSlider } from './Carousel';
import { AuthContext } from './context/AuthContext'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PostOptions from './PostOptions';

const GalleryPost = ({ history, match: { params: { id, postId } } }) => {

    const { authStatus } = useContext(AuthContext)

    const [post, setPost] = useState({})
    const [allPosts, setAllPosts] = useState([])

    const handleDelete = async (deleteId) => {
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
            <p>{post.timestamp && post.timestamp.substring(0, 10)}</p>
            {post.images && <SimpleSlider images={post.images} />}
            <h1>{post.text}</h1>
            <PostOptions elementName='galleryPost' tweetId={postId} id={id} handleDelete={handleDelete} />
        </Fragment>
    )
}

export default withRouter(GalleryPost)