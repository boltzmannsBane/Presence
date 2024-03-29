import React, { useState, useEffect } from "react";
import PostOptions from "./PostOptions";
import { SRLWrapper } from "simple-react-lightbox";
import InfiniteScroll from "react-infinite-scroller";
import { PostForm } from "./PostForm";
import { NavLink as Link } from "react-router-dom";
import firebase from "../firebase";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

export const Tweets = ({
  match: {
    params: { id }
  }
}) => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(10);
  const [postsPerLoad] = useState(10);

  const handleDelete = deleteId => {
    return firebase
      .getData("users")
      .doc(id)
      .update({
        tweets: posts.filter(post => post.id !== deleteId)
      });
  };

  useEffect(() => {
    firebase
      .getData("users")
      .doc(id)
      .onSnapshot(
        snapshot => snapshot.data() && setPosts(snapshot.data().tweets)
      );
  }, [id]);

  return (
    <section className="tweets">
      <PostForm id={id} posts={posts} elementName="tweets" />
      <ul style={{ padding: "20px 20px 0 20px" }}>
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
          <SRLWrapper>
            {posts
              .map(post => (
                <Paper key={post.id}>
                  <li style={{ marginBottom: "50px", padding: "10px" }}>
                    <article style={{ marginBottom: "20px" }}>
                      <Typography variant="body1">{post.text}</Typography>
                    </article>

                    {post.images &&
                      post.images.map(image => (
                        <img
                          src={image}
                          alt="pic"
                          key={image}
                          style={{
                            width: "150px",
                            height: "100px",
                            margin: "1px",
                            objectFit: "cover"
                          }}
                        />
                      ))}

                    <br />
                    <Divider />
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px"
                      }}
                    >
                      <Link to={`/users/${id}/tweets/${post.id}`}>
                        <Typography variant="h6" color="primary">
                          {post.timestamp.substring(0, 10)}
                        </Typography>
                      </Link>
                      <PostOptions
                        elementName="tweets"
                        tweetId={post.id}
                        id={id}
                        handleDelete={handleDelete}
                      />
                    </div>
                  </li>
                </Paper>
              ))
              .slice(0, count)}
          </SRLWrapper>
        </InfiniteScroll>
      </ul>
    </section>
  );
};
