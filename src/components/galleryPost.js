import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom';
import { SimpleSlider } from './Carousel';
import PostOptions from "./PostOptions";
import { Footer } from "./Footer";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const GalleryPost = ({
  history,
  match: {
    params: { id, postId }
  }
}) => {
  const [post, setPost] = useState({});
  const [allPosts, setAllPosts] = useState([]);

  const handleDelete = deleteId =>
    firebase
      .getData("users")
      .doc(id)
      .update({
        gallery: allPosts.filter(post => post.id !== deleteId)
      })
      .then(() => history.replace(`/users/${id}/gallery`))
      .catch(err => alert(err));

  useEffect(() => {
    const getPost = async () => {
      const data = await firebase
        .getData("users")
        .doc(id)
        .get();
      const { gallery } = data.data();
      const { text, timestamp, images } = gallery.filter(
        obj => obj.id === postId
      )[0];
      setPost({ text, timestamp, images });
      setAllPosts(gallery);
    };

    getPost();
  }, []);

  return (
    post && (
      <>
        <main>
          <Paper>
            <SimpleSlider images={post.images} />
            <div style={{ margin: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h3>{post.timestamp && post.timestamp.substring(0, 10)}</h3>
                <PostOptions
                  elementName="gallery"
                  tweetId={postId}
                  id={id}
                  handleDelete={handleDelete}
                />
              </div>
              <article
                style={{ margin: "0 20px 0 20px", paddingBottom: "20px" }}
              >
                <Typography variant="body1">{post.text}</Typography>
              </article>
            </div>
          </Paper>
        </main>
        <Footer />
      </>
    )
  );
};

export default withRouter(GalleryPost);
