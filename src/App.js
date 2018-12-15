import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import dummyData from './dummy-data.js';
import {Post} from './comps/post.js';
import {SearchBar} from './comps/searchBar.js';
import {TweenLite, CSSPlugin} from 'gsap/all';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: dummyData,
      currentUser: 'Zachery',
      newComment: '',
      currentPost: 0,
      commentTimeStamp: [{timepassed: null}],
    };
    this.data = Object.entries(this.state.post);
    this.comments = this.data.map(item => {
      return item[1].comments;
    });
    // this.likeTween = null;
    // this.currentLike = null;
  }

  componentDidMount() {
    let cTs = this.state.post.map((post, index) => {
      return {id: index, time: moment(), timePassed: null};
    });
    this.setState({commentTimeStamp: cTs});
  }

  setTime = () => {
    let newCommentTime = this.state.commentTimeStamp.slice();
    if (newCommentTime.length === this.state.post.length) {
      const timePassed = newCommentTime[this.state.currentPost].time.fromNow();
      newCommentTime[this.state.currentPost].timePassed = timePassed;
      this.setState({currentTimeStamp: newCommentTime});
    }
  };

  updateTime = () => {
    let newCommentTime = this.state.commentTimeStamp.slice();
    if (newCommentTime.length === this.state.post.length) {
      const timePassed = newCommentTime.map(theTime => {
        theTime.timePassed = theTime.time.fromNow();
      });
      this.setState({currentTimeStamp: timePassed});
    }
  };

  captureInput = event => {
    let input = event.target.value;
    let value = event.target.dataset.tab;
    this.setState({newComment: input});
    this.setState({currentPost: value});
  };

  addToComments = () => {
    let thisData = this.state.post.slice();
    let currentInputBox = document.querySelectorAll('input');
    let commentToAdd = {
      username: this.state.currentUser,
      text: this.state.newComment,
    };
    thisData[this.state.currentPost].comments.push(commentToAdd);
    this.setState({post: thisData});
    currentInputBox.forEach(box => {
      return (box.value = '');
    });
    this.setTime();
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
    setInterval(this.updateTime, 1800000);
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
                addComment={this.addToComments}
                time={
                  this.state.commentTimeStamp[this.state.currentPost].timePassed
                }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
