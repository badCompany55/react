import React from 'react';
import {Comments} from './comments.js';
import PropTypes from 'prop-types';

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
            src="./pic/Screenshot from 2018-12-12 21-56-16.png
            "
            alt="heart"
          />
        </div>
        {props.comments.map((com, index) => {
          return (
            <Comments
              key={com.username + index}
              username={com.username}
              comment={com.text}
            />
          );
        })}
        <input
          className="addComment"
          type="text"
          data-tab={props.inputKey}
          placeholder="Add Comments"
          onChange={props.input}
        />
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
};
