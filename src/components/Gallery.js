import React, { Fragment, useState, useEffect } from 'react';
import { PostForm } from './PostForm';
import { NavLink as Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import firebase from '../firebase'

export const Gallery = ({ match: { params: { id } } }) => {

    const [posts, setPosts] = useState([])
    const [count, setCount] = useState(15)
    const [postsPerLoad] = useState(15)

    useEffect(() => {
        firebase.getData('users').doc(id).onSnapshot(snapshot => snapshot.data() && setPosts(snapshot.data().gallery))
    }, [id])

    return (
        <>
            <PostForm id={id} posts={posts} elementName='gallery' />
            <ul>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => {
                        setCount(prevState => prevState + postsPerLoad)
                        console.log('loading')
                    }}
                    hasMore={count < posts.length ? true : false}
                    loader={<div className="loader" key={0}>Loading ...</div>}>

                    {posts.map(post => <li key={post.id}>
                       <Link to={`/users/${id}/gallery/${post.id}`}><img src={post.images[0]} alt='preview' style={{ width: '200px', height: '200px', objectFit: 'cover' }}/></Link>
                    </li>).slice(0, count)}

                </InfiniteScroll>
            </ul>
        </>
    )
}