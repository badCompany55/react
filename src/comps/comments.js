import React from 'react';
import PropTypes from 'prop-types';

export const Comments = props => {
  return (
    <div className="singlePostContainer">
      <p className="username">{props.username}</p>
      <p className="text">{props.comment}</p>
    </div>
  );
};

Comments.propTypes = {
  username: PropTypes.string,
  comment: PropTypes.string,
};
