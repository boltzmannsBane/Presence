import React, { useState, useEffect } from 'react';
import { SRLWrapper } from "simple-react-lightbox";
import InfiniteScroll from 'react-infinite-scroller';
import { PostForm } from './PostForm';

export const Tweets = () => {

    const [posts, setPosts] = useState([])
    const [count, setCount] = useState(10)
    const [postsPerLoad] = useState(10)


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await res.json()
            setPosts(data.map((user, index) => <li>
                {
                    <SRLWrapper>
                        <p>{index}</p>
                        <img src='https://images.pexels.com/photos/2977104/pexels-photo-2977104.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                        <img src='https://images.pexels.com/photos/948331/pexels-photo-948331.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                        <img src='https://images.pexels.com/photos/2938207/pexels-photo-2938207.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                        <img src='https://images.pexels.com/photos/2387876/pexels-photo-2387876.jpeg' alt='pic' style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                    </SRLWrapper>
                }
            </li>))
        }

        fetchData()
    }, [])


    return (
        <section className='tweets'>
            <PostForm posts={posts} setPosts={setPosts} />
            <ul>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => setCount(prevState => prevState + postsPerLoad)}
                    hasMore={count < posts.length ? true : false}
                    loader={<div className="loader" key={0}>Loading ...</div>}>

                    {posts.slice(0, count)}

                </InfiniteScroll>
            </ul>

        </section>
    )
}