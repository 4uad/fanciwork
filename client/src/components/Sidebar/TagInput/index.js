import { React, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import { Autocomplete, Icon } from 'react-materialize';
import {
  selectTags,
  addLike,
  addDislike
} from '../../../redux/tagSlice';
import PropTypes from 'prop-types';

// Get an Array of placeholders to be assigned sequentially
// Each element takes the previous and adds or removes a character
function getPlaceholders(phs) {
  var phStrings = [];
  phs.forEach(x => {
    const len = x.length
    for(let i = 1; i < len + 1; i++) {
      phStrings.push(x.substring(0, i))
    }
  
    phStrings.push(x)
    phStrings.push(x)
    phStrings.push(x)
  
    for(let i = 1; i < len; i++) {
      phStrings.push(x.substring(0, len - i))
    }
  });

  return(phStrings);
}

function TagInput(props) {
  // State
  const [placeholder, setPlaceholder] = useState(0); // Current placeholder index
  const [paused, setPause] = useState(false); // Is the placeholder changing interval paused? (user is typing)
  const [placeholderList, setPlaceholderList] = useState([]); // Array of placeholders to loop through
  const [acKey, setACKey] = useState(0); // Key to be assigned to be autocomplete element (and force re-render)

  // Redux
  const tags = useSelector(selectTags); // List of available tags for the autocomplete
  const dispatch = useDispatch();

  // Misc
  const intervalRef = useRef(); // Interval looping through the placeholders
  const wrapper = useRef(); // Used to detect click outside the input

  // Pause the placeholder loop because user is typing
  const pause = () => {
    setPause(true);
  };

  // Add a new tag to the filter
  const addFilter = (e) => {
    if(props.type === "favorite") {
      dispatch(addLike(e));
    } else {
      dispatch(addDislike(e));
    }
    setACKey(acKey + 1);
    setPause(false);
  };

  // Create a sequence of placeholders to loop through
  useEffect(() => {
    setPlaceholderList(getPlaceholders(props.placeholders.filter(x => typeof x !== 'undefined')));
  }, [props.placeholders]);

  // Create an interval looping through placeholders
  useEffect(() => {
    if(!paused) {
      const interval = setInterval(() => {
        setPlaceholder(placeholder => (placeholder + 1) % placeholderList.length);
      }, 200);
  
      intervalRef.current = interval;
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, placeholderList]);

  // Listen for clicks outside the element (and resume placeholder animation when it happens)
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapper.current && !wrapper.current.contains(event.target)) {
        setPause(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapper])

  return (
    <div className="ac-wrapper" onClick={pause} ref = {wrapper} data-test="taginput">
      <Autocomplete
              key ={acKey}
              id={`autocomplete-${props.type}`}
              icon={<Icon>{props.type}</Icon>}
              options={{
                onAutocomplete: addFilter,
                data: tags.reduce((acc, curr) => (acc[curr] = null, acc), {})
              }}
              placeholder={paused ? "" : placeholderList[placeholder]}
            />
      {props.children}
    </div>
    
  );
}

TagInput.propTypes = {
  type: PropTypes.string, // Favorite or not_interested icon?
  placeholders: PropTypes.arrayOf(PropTypes.string), // Placeholders for the loop
}

export default TagInput;