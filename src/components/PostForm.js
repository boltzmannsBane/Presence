import React, { useState, useContext } from 'react';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'

export const PostForm = ({ posts, id }) => {

    const { authStatus } = useContext(AuthContext)
    const [post, setPost] = useState({
        text: '',
        timestamp: '',
        id: '',
        images: ['dorito', 'nugget']
    })

    function idGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function Post() {
        authStatus && firebase.addTweet(id, post, posts)
    }

    return authStatus && (
        <form onSubmit={(e) => {
            e.preventDefault()
            Post()
            setPost({
                text: '',
                timestamp: '',
                id: '',
                images: []
            })
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
                value={[post.images[0]]}
                name="image"
                placeholder="image 1"
                onChange={e => console.log(e.target.value)}
                required
            />
            <button>Post</button>
        </form>
    )

}