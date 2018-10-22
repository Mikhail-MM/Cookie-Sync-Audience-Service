import React, { Component } from 'react';
import { cookieParser } from './utils/cookies.js'
import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    interestArray: ['Cooking', 'Luxury', 'Style', 'Weddings'],
    activeInterest: this.findActiveInterestFromCookies(),
  }

  componentDidMount() {
    return fetch('https://cookie-sync-partner-1.herokuapp.com/public/cookieBait.js', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })
    .then(res => {
      console.log(res)
      return res.ok ? res.text() : Promise.reject(res.statusText)
    })
    .then(text => console.log(text))
  }

  findActiveInterestFromCookies = () => {
    const cookies = document.cookie;
    console.log(cookieParser.getItem('contentFocus'))
    const interest = cookieParser.getItem('contentFocus')
      return interest
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
