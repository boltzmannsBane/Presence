import React, { useState, useContext, useEffect } from 'react';
import PostOptions from './PostOptions'
import { SRLWrapper } from "simple-react-lightbox";
import InfiniteScroll from 'react-infinite-scroller';
import { PostForm } from './PostForm';
import { NavLink as Link } from 'react-router-dom';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'
import Divider from '@material-ui/core/Divider';

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

    useEffect(() => {
        firebase.getData('users').doc(id).onSnapshot(snapshot => snapshot.data() && setPosts(snapshot.data().tweets))
    }, [id])

    return (
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
                                <main>
                                    <Link to={`/users/${id}/tweets/${post.id}`}><p>{post.timestamp.substring(0, 10)}</p></Link>
                                    <article>
                                        <p>{post.text}</p>
                                    </article>

                                    {post.images && post.images.map(image => <img src={image} alt='pic' key={image} style={{ width: '150px', height: '100px', objectFit: 'cover' }} />)}

                                    <br />
                                    <Divider />
                                    <PostOptions elementName='tweets' tweetId={post.id} id={id} handleDelete={handleDelete} />

                                </main>
                            </li>
                        ).slice(0, count)}
                    </SRLWrapper>
                </InfiniteScroll>
            </ul>

        </section>
    )
}