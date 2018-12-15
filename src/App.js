import React, {Component} from 'react';
import './App.css';
import dummyData from './dummy-data.js';
import {Post} from './comps/post.js';
import {SearchBar} from './comps/searchBar.js';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: dummyData,
      currentUser: 'Zachery',
      newComment: '',
      currentPost: '',
      timePassed: '',
    };
    this.data = Object.entries(this.state.post);
    this.comments = this.data.map(item => {
      return item[1].comments;
    });
  }

  componentDidMount() {
    this.initialSetTime();
  }

  initialSetTime = () => {
    const newObject = this.state.post.slice();
    let newTimePassed = this.state.timePassed.slice();
    let newCommentTime = newObject.map(object => {
      const timestamp = object.timestamp;
      const dateObject = moment(timestamp, 'MMMM-DD-YYYY hh:mm:ss');
      const timePassed = dateObject.fromNow();
      return timePassed;
    });
    this.setState({timePassed: newCommentTime});
  };

  setTime = () => {
    const newTimePassed = this.state.timePassed.slice();
    const tParray = newTimePassed.map((time, index) => {
      if (index == this.state.currentPost) {
        time = moment().fromNow();
      }
      return time;
    });
    this.setState({timePassed: tParray});
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
    return (
      <div>
        <SearchBar />
        <div
          className="App"
          onKeyPress={event =>
            event.key == 'Enter' ? this.addToComments() : null
          }>
          {this.data.map((item, index) => {
            return (
              <Post
                enter={this.addToComments}
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
                time={this.state.timePassed[index]}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
