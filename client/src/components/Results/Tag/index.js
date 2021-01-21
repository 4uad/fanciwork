import { React, useEffect, useState } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    addLike,
    addDislike,
    removeLike,
    removeDislike,
    selectLikes,
    selectDislikes
  } from '../../../redux/tagSlice';

// A Tag element for each tag in a job.
// It is also used to show the current filters.
// Includes two buttons: one to add the current tag to favorites and one to filter it out
function Tag(props) {
  // Redux
  const likes = useSelector(selectLikes); // Array of current liked tags (tagSlice)
  const dislikes = useSelector(selectDislikes); // Array of current disliked tags (tagSlice)
  const dispatch = useDispatch();

  // State
  const [liked, setLiked] = useState(false); // Is this tag liked?
  const [disliked, setDisliked] = useState(false); // Is this tag disliked?

  // Check if this tag is liked or disliked and update state accordingly
  useEffect(() => {
    setLiked(likes.includes(props.children));
    setDisliked(dislikes.includes(props.children));

  }, [likes, dislikes, props.children]);

  // When the user hits like button, dispatch this tag to be added to liked list in tagSlice
  const handleLike = (e) => {
    e.stopPropagation();
    if(!liked) dispatch(addLike(props.children));
    else dispatch(removeLike(props.children));
  };

  // When the user hits dislike button, dispatch this tag to be added to disliked list in tagSlice
  const handleDislike = (e) => {
    e.stopPropagation();
    if(!disliked) dispatch(addDislike(props.children));
    else dispatch(removeDislike(props.children));
  };

  return (
    <span className="chip tag" data-test="tag">
        {props.children}
        {!disliked ? <i className={"material-icons like" + (liked ? " active-tag" : "")} onClick = {handleLike}>favorite</i> : ""}
        {!liked ? <i className={"material-icons dislike" + (disliked ? " active-tag" : "")}  onClick = {handleDislike}>not_interested</i> : ""}
    </span>
  );
}

export default Tag;