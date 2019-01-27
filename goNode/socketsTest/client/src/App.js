import axios from 'axios';

import React, { Component } from 'react';
import socket from './services/socket';

// const api = axios.create({
//   baseURL: 'http://localhost:3001/',
// })

class App extends Component {
  state = {
    tweets: [],
    room: '',
    roomToSend: '',
    message: '',
  }

  componentDidMount() {
    socket.on('tweet', this.handleNewTweet);
    socket.on('message', this.handleMessage);
    socket.on('messageReceived', this.receiveSend);
  }

  handleNewTweet = tweet => {
    this.setState({ tweets: [...this.state.tweets, tweet]})
  }

  handleMessage = message => {
    console.log(message)
  }

  receiveSend = message => {
    console.log(message)
  }

  join = () => {
    socket.emit('subscribe', this.state.room);
  }

  send = () => {
    const data = {
      room: this.state.roomToSend,
      message: this.state.message,
    }
    socket.emit('send', data);
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.tweets.map(tweet => (
            <li key={tweet._id}>{tweet.content}</li>
          ))}
        </ul>
        <input
          value={this.state.room}
          onChange={(e) => this.setState({room: e.target.value})}
        />
        <button onClick={this.join}>Join Room {this.state.room}</button>
        <hr/>
        <input
          value={this.state.roomToSend}
          placeholder="room to send message"
          onChange={(e) => this.setState({roomToSend: e.target.value})}
        />
        <input
          value={this.state.message}
          onChange={(e) => this.setState({message: e.target.value})}
        />
        <button onClick={this.send}>Send Message {this.state.roomToSend}</button>
      </div>
    );
  }
}

export default App;
