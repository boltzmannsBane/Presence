import React, { useState, useContext } from 'react';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'

export const PostForm = ({ posts, id }) => {

    const { authStatus } = useContext(AuthContext)
    const [post, setPost] = useState({
        text: '',
        timestamp: '',
        id: '',
        images: []
    })
    const [image, setImage] = useState('')

    function idGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function Post() {
        authStatus && firebase.addTweet(id, post, posts)
    }

    const items = ['https://i.imgur.com/mYpFBrT.jpg', 'https://i.imgur.com/q2N1KEj.jpg', 'https://i.imgur.com/2PMvDEX.jpg', 'https://i.imgur.com/5U7nYOp.jpg']

    function Reset() {
        setPost({
            text: '',
            timestamp: '',
            id: '',
            images: []
        })
    }

    return authStatus && (
        <form onSubmit={(e) => {
            e.preventDefault()
            Post()
            Reset()
        }}>
            <input
                type="text"
                value={post.text}
                name="post"
                placeholder="what's on your mind?"
                onChange={e => {
                    setPost({
                        text: e.target.value,
                        timestamp: new Date().toISOString(),
                        id: idGenerator()
                    })
                }}
                required
            />
            <br />

            {/* post.images[0] doesn't work in react. alternatives ?? */}

            <input
                type="url"
                value={image}
                name="image"
                placeholder="image 1"
                onChange={e => setImage(e.target.value)}
            />
            <button onClick={(e) => {
                e.preventDefault()
                setPost(prevPost => ({ ...prevPost, images: [image]}))
                setImage('')
                console.log(post)
            }}>Add Image</button>
            <button>Post</button>
        </form>
    )

}