import React from 'react';
import './searchBar.css';

export const SearchBar = props => {
  return (
    <div className="searchContainer">
      <div className="middleContainer">
        <div className="picContainer">
          <img className="instaLogo" src={'./instaLogo.png'} alt="instaLogo" />
          <img src={'./instagram.png'} alt="instagram" />
        </div>
        <div className="search">
          <input type="text" placeholder="Search" onChange={props.search} />
        </div>
        <div className="sidContainer">
          <img src={'./extra.png'} alt="unsure" />
          <img src={'./heartThumb.png'} alt="likes" />
          <img src={'./users.png'} alt="users" />
        </div>
      </div>
    </div>
  );
};
