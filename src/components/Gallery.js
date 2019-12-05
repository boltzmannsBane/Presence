import React, { useState, useEffect } from "react";
import { PostForm } from "./PostForm";
import { NavLink as Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import firebase from "../firebase";

export const Gallery = ({
  match: {
    params: { id }
  }
}) => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(15);
  const [postsPerLoad] = useState(15);

  useEffect(() => {
    firebase
      .getData("users")
      .doc(id)
      .onSnapshot(
        snapshot => snapshot.data() && setPosts(snapshot.data().gallery)
      );
  }, [id]);

  return (
    <>
      <PostForm id={id} posts={posts} elementName="gallery" />
      <ul className="gallery">
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            setCount(prevState => prevState + postsPerLoad);
          }}
          hasMore={count < posts.length ? true : false}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {posts
            .map(post => (
              <li key={post.id}>
                <Link to={`/users/${id}/gallery/${post.id}`}>
                  <img src={post.images[0]} alt="preview" />
                </Link>
              </li>
            ))
            .slice(0, count)}
            <li className='filler'></li>
            <li className='filler'></li>
        </InfiniteScroll>
      </ul>
    </>
  );
};
