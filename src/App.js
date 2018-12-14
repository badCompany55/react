import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import dummyData from './dummy-data.js';
import {Post} from './comps/post.js';
import {SearchBar} from './comps/searchBar.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: dummyData,
      currentUser: 'Zachery',
      newComment: '',
      currentPost: '',
    };
    this.data = Object.entries(this.state.post);
    this.comments = this.data.map(item => {
      return item[1].comments;
      // console.log(item);
    });
    // console.log(this.comments);
  }

  captureInput = event => {
    let input = event.target.value;
    let value = event.target.dataset.tab;
    this.setState({newComment: input});
    this.setState({currentPost: value});
  };

  addToComments = () => {
    let thisData = this.state.post.slice();
    let commentToAdd = {
      username: this.state.currentUser,
      text: this.state.newComment,
    };
    thisData[this.state.currentPost].comments.push(commentToAdd);
    this.setState({post: thisData});
  };

  likeAPost = event => {
    let counterComments = this.state.post.slice();
    let position = event.target.dataset.tab;
    counterComments[position].likes += 1;
    this.setState(prevState => {
      return {likes: counterComments};
    });
  };

  render() {
    return (
      <div>
        <SearchBar />
        <div
          className="App"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.addToComments();
            }
          }}>
          {this.data.map((item, index) => {
            return (
              <Post
                key={item[1].username}
                inputKey={index}
                thumb={item[1].thumbnailUrl}
                username={item[1].username}
                count={item[1].likes}
                pic={item[1].imageUrl}
                like={this.likeAPost}
                comments={item[1].comments}
                input={this.captureInput}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
