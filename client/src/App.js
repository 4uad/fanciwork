import { React, useEffect } from 'react';
import './www/materialize.min.css';
import './www/App.css';
import Sidebar from './components/Sidebar';
import Results from './components/Results';
import { useLocation } from 'react-router-dom';
import {
  selectLikes,
  selectDislikes,
  resetFilters
} from './redux/tagSlice';
import {
  addLike,
  addDislike
} from './redux/tagSlice';
import { useSelector, useDispatch } from 'react-redux';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App(props) {
  // Routing
  const query = useQuery();
  const urlLikes = query.get("l");
  const urlDislikes = query.get("d");

  // Redux
  const likes = useSelector(selectLikes);
  const dislikes = useSelector(selectDislikes)
  const dispatch = useDispatch();

  // Encode likes and dislikes to URL
  useEffect(() => {
    let params = {};
    if(likes.length) params['l'] = likes;
    if(dislikes.length) params['d'] = dislikes;

    let queryString;
    if(likes.length || dislikes.length) {
      queryString = '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    } else {
      queryString = ""
    }

    props.history.push(queryString)
  }, [likes, dislikes, props.history])

  // Decode URL to likes and dislikes
  useEffect(() => {
    if(urlLikes || urlDislikes) dispatch(resetFilters())
    if(urlLikes) {
      let likes = urlLikes.split(',');
      for(let i = 0; i < likes.length; i++) {
        dispatch(addLike(likes[i]))
      }
    }
    if(urlDislikes) {
      let dislikes = urlDislikes.split(',');
      for(let i = 0; i < dislikes.length; i++) {
        dispatch(addDislike(dislikes[i]))
      }
    }
  }, [urlLikes, urlDislikes])

  return (
    <div className="App">
      <Sidebar ph = {['Show me jobs related to...', "Don't show me jobs related to..."]} />
      <Results />
    </div>
  );
}

export default App;