import React, { useState, useEffect, Fragment } from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom';

const Tweet = ({ history, match: { params: { id, tweetId } } }) => {

    const [tweet, setTweet] = useState({})
    const [allTweets, setAllTweets] = useState([])

    const Delete = async (deleteId) => {
        return firebase.getData('users').doc(id).update({
            tweets: allTweets.filter(post => post.id !== deleteId)
        })
    }

    useEffect(() => {
        const getTweet = async () => {
            const data = await firebase.getData('users').doc(id).get()
            const { tweets } = data.data()
            const { text, timestamp } = tweets.filter(obj => obj.id === tweetId)[0]
            setTweet({ text, timestamp })
            setAllTweets(tweets)
        }

        getTweet()
    }, [])

    return (
        <Fragment>
            <p>{tweet.timestamp}</p>
            <h1>{tweet.text}</h1>
            <button onClick={(e) => {
                e.preventDefault()
                Delete(tweetId)
                history.replace(`/${id}/tweets`)
            }}>DELETE</button>
        </Fragment>
    )
}

export default withRouter(Tweet)