import React, { useState, useContext, useEffect } from 'react';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'

export const PostForm = ({ elementName, id }) => {

    const { authStatus } = useContext(AuthContext)
    const [post, setPost] = useState({})
    const [data, setData] = useState('')
    const [sw, setSw] = useState(false)

    function idGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function Post() {
        authStatus && data && firebase.addTweet(elementName, id, post, data.tweets)
        setSw(prevState => !prevState)
    }

    useEffect(() => {
        firebase.getData('users').doc(id).get().then(res => {
            setData(res.data())
        })
    }, [authStatus, sw])

    return authStatus && (
        <form onSubmit={(e) => {
            e.preventDefault()
            Post()
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
            <button>Post</button>
        </form>
    )

}