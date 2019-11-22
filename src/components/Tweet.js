import React, { useState, useEffect, useContext, Fragment } from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";
import { AuthContext } from './context/AuthContext'
import PostOptions from './PostOptions'

const Tweet = ({ history, match: { params: { id, tweetId } } }) => {

    const { authStatus } = useContext(AuthContext)

    const [tweet, setTweet] = useState({})
    const [allTweets, setAllTweets] = useState([])

    const handleDelete = async (deleteId) => {
        return firebase.getData('users').doc(id).update({
            tweets: allTweets.filter(post => post.id !== deleteId)
        })
    }

    useEffect(() => {
        const getTweet = async () => {
            const data = await firebase.getData('users').doc(id).get()
            const { tweets } = data.data()
            const { text, timestamp, images } = tweets.filter(obj => obj.id === tweetId)[0]
            setTweet({ text, timestamp, images })
            setAllTweets(tweets)
        }

        getTweet()
    }, [])

    return (
        <main>
            <p>{tweet.timestamp}</p>
            <article><h1>{tweet.text}</h1></article>
            {tweet.images && <SRLWrapper>
                {tweet.images.map(image => <img src={image} key={image} style={{ width: '190px', height: '150px', objectFit: 'cover' }} />)}
            </SRLWrapper>}
            <PostOptions elementName='tweet' tweetId={tweetId} id={id} handleDelete={handleDelete} />
        </main>
    )
}

export default withRouter(Tweet)