import { React } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggle,
  selectCollapse
} from '../../redux/collapseSlice';
import {
  selectLikes,
  selectDislikes,
  selectTags
} from '../../redux/tagSlice';
import TagInput from './TagInput';
import Tag from '../Results/Tag';
import PropTypes from 'prop-types';

function Sidebar(props) {
  // Redux
  const collapsed = useSelector(selectCollapse); // Should this sidebar be collapsed?
  const tags = useSelector(selectTags); // Array with all available tags
  const likes = useSelector(selectLikes); // Array of liked tags
  const dislikes = useSelector(selectDislikes); // Array of disliked tags
  const dispatch = useDispatch();

  const _ = require('lodash');

  const likedTags = likes.map((t, i) => <Tag key = {`tag${i}`}>{t}</Tag>)
  const dislikedTags = dislikes.map((t, i) => <Tag key = {`tag${i + likes.length + 1}`}>{t}</Tag>)

  return (
    <>
        <div className = {"aside-placeholder" + (collapsed ? " aside-collapsed" : "")} />
        <aside className={collapsed ? "z-depth-1 aside-collapsed" : "z-depth-2"} data-test = "sidebar">
            <button onClick={() => dispatch(toggle())} className="aside-collapse-btn btn-floating btn-small waves-effect waves-light green accent-2"><i className="material-icons black-text">keyboard_arrow_left</i></button>
            <div className = "logo" style={{backgroundImage: `url(${require('../../www/fanciwork-logo.png').default})`}} />
            <div className="aside-inputs">
              <TagInput type = "favorite" placeholders = {tags ? [props.ph[0]].concat(_.range(3).map(() => _.sample(tags))) : [props.ph[0]]}>
                {likedTags}
              </TagInput>
              <TagInput type = "not_interested" placeholders = {tags ? [props.ph[1]].concat(_.range(3).map(() => _.sample(tags))) : [props.ph[1]]}>
                {dislikedTags}
              </TagInput>
            </div>
            <div className="background-container" style={{backgroundImage:`url(${require('../../www/crayons.png').default})`}}></div>
        </aside>
    </>
  );
}

Sidebar.propTypes = {
  ph: PropTypes.arrayOf(PropTypes.string) // initial placeholders for the inputs
}

export default Sidebar;