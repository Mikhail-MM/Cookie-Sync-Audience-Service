import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://cookie-sync-partner-1.herokuapp.com/public/cookieBait.js', true);
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
      if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log(this)
        }
      } 
    xhr.send(null);

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            This is the Audience Service Provider
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
