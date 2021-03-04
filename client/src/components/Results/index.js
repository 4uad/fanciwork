import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCollapse,
} from '../../redux/collapseSlice';
import {
  selectLikes,
  selectDislikes,
  addTags,
  resetFilters
} from '../../redux/tagSlice';
import './style.css';
import Job from './Job';
import Tag from './Tag';
import { Icon, Toast } from 'react-materialize';

// A preloader spinner
function Spinner() {
  return(
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>

      <div className="spinner-layer spinner-red">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>

      <div className="spinner-layer spinner-yellow">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>

      <div className="spinner-layer spinner-green">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}

// Container displaying job postings found
function Results() {
  // State
  const [ads, updateAds] = useState([]); // An array of objects containing job details
  const [matches, setMatches] = useState(true); // Are there any jobs matching the criteria?

  // Redux
  const collapsed = useSelector(selectCollapse); // Is the sidenav collapsed?
  const likes = useSelector(selectLikes); // Array of liked tags
  const dislikes = useSelector(selectDislikes); // Array of disliked tags
  const dispatch = useDispatch();

  // Fetch from API, passing the liked and disliked tags.
  useEffect(() => {
    updateAds([]); // Reset previous ads
    fetch("/fanciwork/api/", {
      method: 'POST',
      body: JSON.stringify({with: likes, without: dislikes, max_length: 9})
    })
      .then(res => res.json())
      .then(
        (result) => {
          updateAds(result.jobs) // Update state with found jobs.
          setMatches(!result.no_matches) // Update no matches status

          dispatch(addTags(result.tags)) // Update the global list of visible tags
        },
        (error) => {
          console.log(error)
          console.log("Error fetching from remoteok")
        }
      );

  }, [likes, dislikes]);

  // Copy link to clipboard on "Share" btn click
  const copyShareLink = (e) => {
    navigator.clipboard.writeText(window.location.href)
  }

  // Default content: a preloader spinner
  var jobs = <Spinner />

  // as soon as there are jobs, replace the spinner with an array of job elements
  if(ads.length > 0) {
    jobs = ads.map((a, i) => <Job key = {`job${i}`} title = {a.position} url = {a.url} tags = {a.tags} logo = {a.company_logo} company = {a.company}>{a.description}</Job>)
  }

  // If there are any filters, display SHARE and RESET btns
  const reset = likes.length > 0 || dislikes.length > 0 ? <div className="reset-btn">
    <button className="waves-effect waves-teal btn-flat" onClick = {() => dispatch(resetFilters())}>Reset</button>
    {matches && <span onClick={copyShareLink}><Toast onClick={copyShareLink} className="sharetoast" options={{ html: 'Link copied to clipboard!'}}><Icon>share</Icon></Toast></span>}
  </div> : ""

  // Box informing of the number of jobs found (or no matching jobs error message)
  var matches_info = <div className="matches-info no-matches" style={{backgroundImage: `url(${require('../../www/disappointed.png').default})`}}>No matching jobs{reset}</div>;
  if(matches) {
    matches_info = <div className="matches-info">{ads.length} matching jobs found on <a href="https://remoteok.io/" target="_blank" rel="noreferrer">remoteOK</a>{reset}</div>;
  }

  // Create a tag element for each filter applied
  const tags = likes.map((t, i) => <Tag key = {`tag${i}`}>{t}</Tag>).concat(dislikes.map((t, i) => <Tag key = {`tag${i + likes.length + 1}`}>{t}</Tag>));

  return (
    <div className = {"results" + (collapsed ? " expanded" : "")} data-test="results">
      <div className="tags">
        {collapsed ? tags : ""}
      </div>
      <ul className="collapsible">
        {ads.length > 0 || !matches ? matches_info : ""}
      </ul>
      {matches ? <ul className="collapsible">{jobs}</ul> : ""}
    </div>
  );
}

export default Results;