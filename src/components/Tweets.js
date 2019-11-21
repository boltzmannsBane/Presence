import React, { useState, useContext, useEffect } from 'react';
import PostOptions from './PostOptions'
import { SRLWrapper } from "simple-react-lightbox";
import InfiniteScroll from 'react-infinite-scroller';
import { PostForm } from './PostForm';
import { NavLink as Link } from 'react-router-dom';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'

export const Tweets = ({ match: { params: { id } } }) => {

    const { authStatus } = useContext(AuthContext)

    const [posts, setPosts] = useState([])
    const [count, setCount] = useState(10)
    const [postsPerLoad] = useState(10)

    const handleDelete = async (deleteId) => {
        return firebase.getData('users').doc(id).update({
            tweets: posts.filter(post => post.id !== deleteId)
        })
    }

    // this fails a lot. how do i make .tweets wait for the snapshot?

    // solved with snapshot.data(), but still unsure. how do i error handle this?

    useEffect(() => {
        firebase.getData('users').doc(id).onSnapshot(snapshot => snapshot.data() && setPosts(snapshot.data().tweets))
    }, [])

    return posts && (
        <section className='tweets'>
            <PostForm id={id} posts={posts} elementName='tweets' />
            <ul>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => {
                        setCount(prevState => prevState + postsPerLoad)
                        console.log('loading')
                    }}
                    hasMore={count < posts.length ? true : false}
                    loader={<div className="loader" key={0}>Loading ...</div>}>
                    <SRLWrapper>
                        {posts.map(post => 
                            <li key={post.id}>
                                <Link to={`/${id}/tweets/${post.id}`}><p>{post.timestamp.substring(0, 10)}</p></Link>
                                <article>
                                    <p>{post.text}</p>
                                </article>
                                <p>{post.id}</p>

                                <br />

                                {post.images && post.images.map(image => <img src={image} alt='pic' key={image} style={{ width: '150px', height: '100px', objectFit: 'cover' }} />)}
                                
                                <br />

                                <PostOptions tweetId={post.id} id={id} handleDelete={handleDelete} />
                            </li>
                        ).slice(0, count)}
                    </SRLWrapper>
                </InfiniteScroll>
            </ul>

        </section>
    )
}