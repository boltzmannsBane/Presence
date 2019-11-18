import React, { useState, useContext, useEffect } from 'react';
import { SRLWrapper } from "simple-react-lightbox";
import InfiniteScroll from 'react-infinite-scroller';
import { PostForm } from './PostForm';
import { NavLink as Link } from 'react-router-dom';
import firebase from '../firebase'

export const Tweets = ({ match: { params: { id } } }) => {

    const [posts, setPosts] = useState([])
    const [count, setCount] = useState(10)
    const [postsPerLoad] = useState(10)

    const Delete = async (deleteId) => {
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
            <PostForm id={id} posts={posts} />
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
                        <article>
                            <p>{post.text}</p>
                        </article>
                        <p>{post.id}</p>
                        <button onClick={(e) => {
                            e.preventDefault()
                            Delete(post.id)
                        }}>DELETE</button>
                        <Link to={`/${id}/tweets/${post.id}`}>direct link</Link>
                        <SRLWrapper>
                            <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                            {post.images && post.images.map(image => <img src={image} alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />)}
                        </SRLWrapper>

                    </li>).slice(0, count)}

                </InfiniteScroll>
            </ul>

        </section>
    )
}