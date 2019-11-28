import React from 'react';
import './style/App.scss';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import AuthContextProvider from './components/context/AuthContext';
import { Gallery } from './components/Gallery';
import { Tweets } from './components/Tweets';
import SimpleReactLightbox from "simple-react-lightbox";
import Login from './components/auth/Login';
import Register from './components/auth/Register'
import { Profile } from './components/Profile';
import Tweet from './components/Tweet';
import galleryPost from './components/galleryPost';
import Settings from './components/Settings'
import CssBaseline from '@material-ui/core/CssBaseline'

const options = {
  autoplaySpeed: 1500,
  transitionSpeed: 900,
  showCaption: false,
  showThumbnails: true
};

function App() {

  return (
    <Router>
      <AuthContextProvider>
          <SimpleReactLightbox {...options}>
            <CssBaseline />
            <Route path='/users/:id' component={Profile}/>
            <Route path='/users/:id/gallery' component={Gallery} exact/>
            <Route path='/users/:id/tweets' component={Tweets} exact exact/>
            <Route path='/' component={Login} exact/>
            <Route path='/register' component={Register}/>
            <Route path='/users/:id/tweets/:tweetId' component={Tweet}/>
            <Route path='/users/:id/gallery/:postId' component={galleryPost} />
            <Route path='/users/:id/settings' component={Settings} />
          </SimpleReactLightbox>
      </AuthContextProvider>
    </Router>
  )
}

export default App;
