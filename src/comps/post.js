import React from 'react';
import {Comments} from './comments.js';
import PropTypes from 'prop-types';
import './post.css';

export const Post = props => {
  return (
    <div className="post">
      <div className="headerContainer">
        <img className="thumbNail" src={props.thumb} alt="user pic" />
        <h2 className="user">{props.username}</h2>
      </div>
      <img className="postImg" src={props.pic} alt="post pic" />
      <div className="commContain">
        <div className="likes">
          <img
            className="heart"
            data-tab={props.inputKey}
            src={'./heartThumb.png'}
            alt="commentThumb"
            onClick={props.like}
          />
          <img
            className="comment"
            data-tab={props.inputKey}
            src={'./commentThumb.png'}
            alt="commentThumb"
          />
        </div>
        <div className="numberOfLikes">{props.count} likes</div>
        {props.comments.map((com, index) => {
          return (
            <Comments
              key={com.username + index}
              username={com.username}
              comment={com.text}
            />
          );
        })}
        <div className="inputComment">
          <input
            className="addComment"
            type="text"
            data-tab={props.inputKey}
            placeholder="Add Comments"
            onChange={props.input}
          />
          <img src={'./addComment.png'} alt="addComment" />
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  thumb: PropTypes.string,
  username: PropTypes.string,
  pic: PropTypes.string,
  inputKey: PropTypes.number,
  input: PropTypes.func,
  count: PropTypes.number,
};
