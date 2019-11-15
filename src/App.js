import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContextProvider from './components/context/AuthContext';
import { Header } from './components/Header';
import { Gallery } from './components/Gallery';
import { Tweets } from './components/Tweets';
import SimpleReactLightbox from "simple-react-lightbox";
import Login from './components/auth/Login';
import { Register } from './components/auth/Register'
import { Profile } from './components/Profile';
import Tweet from './components/Tweet';

const options = {
  overlayColor: "rgb(25, 136, 124)",
  captionStyle: {
    captionColor: "#a6cfa5",
    captionFontFamily: "Raleway, sans-serif",
    captionFontSize: "22px",
    captionFontWeight: "300",
    captionFontStyle: "capitalize"
  },
  buttonsStyle: {
    buttonsBackgroundColor: "#1b5245",
    buttonsIconColor: "rgba(126, 172, 139, 0.8)"
  },
  autoplaySpeed: 1500,
  transitionSpeed: 900,
  showCaption: true,
  showThumbnails: true
};

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div>
          <SimpleReactLightbox {...options}>
            <Route path='/:id' component={Profile} />
            <Route path='/:id/gallery' component={Gallery} exact/>
            <Route path='/:id/tweets' component={Tweets} exact/>
            <Route path='/' component={Login} exact/>
            <Route path='/register' component={Register} />
            <Route path='/:id/tweets/:tweetId' component={Tweet}/>
          </SimpleReactLightbox>
        </div>
      </AuthContextProvider>
    </Router>
  )
}

export default App;
