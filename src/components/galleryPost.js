import React, { useState, useEffect, useContext, Fragment } from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom';
import { SimpleSlider } from './Carousel';
import { AuthContext } from './context/AuthContext'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const GalleryPost = ({ history, match: { params: { id, postId } } }) => {

    const { authStatus } = useContext(AuthContext)

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
            <p>{post.timestamp && post.timestamp.substring(0, 10)}</p>
            {post.images && <SimpleSlider images={post.images} />}
            <h1>{post.text}</h1>
            {authStatus && authStatus.uid === id && <button onClick={(e) => {
                e.preventDefault()
                Delete(postId)
                history.replace(`/${id}/gallery`)
            }}><DeleteForeverIcon /></button>}
        </Fragment>
    )
}

export default withRouter(GalleryPost)