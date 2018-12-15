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
      searchUser: '',
    };
    this.data = Object.entries(this.state.post);
    this.comments = this.data.map(item => {
      return item[1].comments;
    });
  }

  componentDidMount() {
    this.initialSetTime();
  }

  search = () => {
    const newObject = this.state.post.slice();
    const userNames = newObject.filter(
      object => object.username === this.state.searchUser,
    );
    console.log(userNames);
    this.setState({post: userNames});
  };

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
    let theTime;
    const tParray = newTimePassed.map((time, index) => {
      if (index == this.state.currentPost) {
        time = moment().fromNow();
        theTime = moment();
      }
      return time;
    });
    this.setState({timePassed: tParray});
    const newPostObject = this.state.post.map((object, index) => {
      if (index == this.state.currentPost) {
        console.log(object.timestamp);
        object.timestamp = theTime;
      }
      return object;
    });
    console.log(newPostObject);
    this.setState({post: newPostObject});
  };

  updateTime = () => {
    const newStateObject = this.state.post.slice();
    let timestamp;
    newStateObject.map(object => {
      timestamp.push(object.timestamp.fromNow());
    });
    this.setState({timePassed: timestamp});
  };

  // for the comments

  captureInput = event => {
    let input = event.target.value;
    let value = event.target.dataset.tab;
    this.setState({newComment: input});
    this.setState({currentPost: value});
  };

  captureSearchInput = event => {
    let input = event.target.value;
    this.setState({searchUser: input});
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
        <div
          onKeyPress={event => (event.key == 'Enter' ? this.search() : null)}>
          <SearchBar search={this.captureSearchInput} />
        </div>
        <div
          className="App"
          onKeyPress={event =>
            event.key == 'Enter' ? this.addToComments() : null
          }>
          <div>
            {this.state.post.length !== 0 ? (
              this.state.post.map((item, index) => {
                return (
                  <Post
                    length={this.state.post.length}
                    enter={this.addToComments}
                    key={item.username}
                    inputKey={index}
                    thumb={item.thumbnailUrl}
                    username={item.username}
                    count={item.likes}
                    pic={item.imageUrl}
                    like={this.likeAPost}
                    comments={item.comments}
                    input={this.captureInput}
                    addComment={this.addToComments}
                    time={this.state.timePassed[index]}
                  />
                );
              })
            ) : (
              <div className="error">
                Sorry there arn't any results for:
                <p className="noResults">{this.state.searchUser}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
