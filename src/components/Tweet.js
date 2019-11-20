import React, { useState, useEffect, useContext, Fragment } from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";
import { AuthContext } from './context/AuthContext'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Tweet = ({ history, match: { params: { id, tweetId } } }) => {

    const { authStatus } = useContext(AuthContext)

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
            const { text, timestamp, images } = tweets.filter(obj => obj.id === tweetId)[0]
            setTweet({ text, timestamp, images })
            setAllTweets(tweets)
        }

        getTweet()
    }, [])

    return (
        <Fragment>
            <p>{tweet.timestamp}</p>
            <h1>{tweet.text}</h1>
            <SRLWrapper>
                {tweet.images && tweet.images.map(image => <img src={image} style={{ width: '190px', height: '150px', objectFit: 'cover' }} />)}
            </SRLWrapper>
            {authStatus && authStatus.uid === id && <button onClick={(e) => {
                e.preventDefault()
                Delete(tweetId)
                history.replace(`/${id}/tweets`)
            }}><DeleteForeverIcon /></button>}
        </Fragment>
    )
}

export default withRouter(Tweet)