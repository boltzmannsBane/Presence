import React, { useState, useEffect,} from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";
import PostOptions from './PostOptions'
import { Footer } from './Footer';

const Tweet = ({ history, match: { params: { id, tweetId } } }) => {

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
        <>
        <main className='tweet' style={{margin: '10px'}}> 
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 10px 0 10px' }}>
                <h3>{tweet.timestamp && tweet.timestamp.substring(0, 10)}</h3>
                <PostOptions elementName='tweet' tweetId={tweetId} id={id} handleDelete={handleDelete} />
            </div>
            <article style={{margin: '0 20px 0 20px'}}><p>{tweet.text}</p></article>
            {tweet.images && <SRLWrapper>
                {tweet.images.map(image => <img src={image} key={image} alt='tweetImage' style={{objectFit: 'cover' }} />)}
            </SRLWrapper>}
        </main>
        <Footer />
        </>
    )
}

export default withRouter(Tweet)