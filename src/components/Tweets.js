import React, { useState, useContext, useEffect } from 'react';
import PostOptions from './PostOptions'
import { SRLWrapper } from "simple-react-lightbox";
import InfiniteScroll from 'react-infinite-scroller';
import { PostForm } from './PostForm';
import { NavLink as Link } from 'react-router-dom';
import firebase from '../firebase'
import { AuthContext } from './context/AuthContext'
import Slide from '@material-ui/core/Slide'

export const Tweets = ({ match: { params: { id } } }) => {

    const { authStatus } = useContext(AuthContext)

    const [posts, setPosts] = useState([])
    const [count, setCount] = useState(10)
    const [postsPerLoad] = useState(10)

    const [checked, setChecked] = useState(true);

    const handleChange = () => {
        setChecked(prev => !prev);
      };

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
                        {posts.map(post => <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                            <li>
                                <p>{post.timestamp.substring(0, 10)}</p>
                                <article>
                                    <p>{post.text}</p>
                                </article>
                                <p>{post.id}</p>

                                <Link to={`/${id}/tweets/${post.id}`}>direct link</Link>

                                <br />

                                {post.images && post.images.map(image => <img src={image} alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />)}
                                <PostOptions tweetId={post.id} id={id} handleDelete={handleDelete} />
                            </li>
                        </Slide>).slice(0, count)}
                    </SRLWrapper>
                </InfiniteScroll>
            </ul>

        </section>
    )
}