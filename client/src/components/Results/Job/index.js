import { React, useState, useEffect } from 'react';
import './style.css';
import Tag from '../Tag';
import PropTypes from 'prop-types';

const defLogo = <i className="material-icons">whatshot</i>

// A Job element for each posting fetched from the API.
// Based on MaterializeCSS collapsible.
function Job(props) {
  // Is Job description collapsed (true) or visible (false)?
  const [collapsed, collapseAd] = useState(true);
  const [logo, setLogo] = useState(<i className="material-icons">whatshot</i>)


  useEffect(() => {
      if(props.logo) {
        setLogo(<img onError = {() => setLogo(defLogo)} src={props.logo} alt={`${props.company} logo`} />); // If there's a company logo replace the default
      } else {
        setLogo(defLogo); // Default logo
      }
  }, [props.logo, props.company])

  // Tags in the job (if any)
  const tags = props.tags.map((t, i) => <Tag key = {`tag${i}`}>{t}</Tag>);

  return (
    <li data-test="job">
        <div className="collapsible-header job-header" onClick = {() => collapseAd(!collapsed)}>
            <div className = "job-data">
                <div className = "job-icon">{logo}</div>
                <div className = "job-title">
                    {props.title}{props.company && <span className = "job-company"> at {props.company}</span>}
                </div>
                <div className = "job-link">
                    <a data-test="job-link" href={props.url} className="waves-effect waves-light btn-small green accent-2 black-text" onClick = {(e) => e.stopPropagation()} target="_blank" rel="noreferrer"><span className="material-icons right">exit_to_app</span></a>
                </div>
            </div>
            <div className = "job-tags">{tags}</div>
            
        </div>
        <div className={"collapsible-body job-body" + (collapsed ? "" : " visible")}>
            <span className = "job-desc">{props.children}</span>
        </div>
    </li>
  );
}

Job.propTypes = {
    title: PropTypes.string, // Position name
    url: PropTypes.string, // URL to remoteok posting
    tags: PropTypes.arrayOf(PropTypes.string), // Tags
    logo: PropTypes.string, // URL to company logo
    company: PropTypes.string // Company name
}

export default Job;