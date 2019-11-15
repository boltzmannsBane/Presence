import React, { useState, useEffect } from 'react';
import { SRLWrapper } from "simple-react-lightbox";
import InfiniteScroll from 'react-infinite-scroller';
import { PostForm } from './PostForm';
import { NavLink as Link, withRouter } from 'react-router-dom';
import firebase from '../firebase'

export const Tweets = ({ match: { params: { id } } }) => {

    const [posts, setPosts] = useState([])
    const [count, setCount] = useState(10)
    const [postsPerLoad] = useState(10)

    useEffect(() => {
        firebase.getData('users').doc(id).onSnapshot(snapshot => setPosts(snapshot.data().tweets))
    }, [])

    return (
        <section className='tweets'>
            <PostForm elementName='tweets' id={id} />
            <ul>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => {
                        setCount(prevState => prevState + postsPerLoad)
                        console.log('loading')
                    }}
                    hasMore={count < posts.length ? true : false}
                    loader={<div className="loader" key={0}>Loading ...</div>}>

                    {posts.map(post => <li>
                        <p>{post.timestamp}</p>
                        <p>{post.text}</p>
                        <p>{post.id}</p>
                        <Link to={`/${id}/tweets/${post.id}`}>direct link</Link>
                        <SRLWrapper>
                            <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                            <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                            <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                            <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                        </SRLWrapper>

                    </li>).slice(0, count)}

                </InfiniteScroll>
            </ul>

        </section>
    )
}