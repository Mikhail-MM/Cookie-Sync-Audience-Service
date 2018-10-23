import React, { Component } from 'react';
import { cookieParser } from './utils/cookies.js'
import logo from './logo.svg';
import './App.css';


class App extends Component {
    state = {
     	interestArray: ['Cooking', 'Cars', 'Style', 'Weddings'],
     	activeInterest: null,
    }

  componentDidMount() {
  	this.setState({
  		activeInterest: this.findActiveInterestFromCookies()
  	})
  }

  findActiveInterestFromCookies = () => {
    const cookies = document.cookie;
    console.log(cookieParser.getItem('contentFocus'))
    const interest = cookieParser.getItem('contentFocus')
    console.log(cookieParser.getItem('unreal'))
      return interest
  }

  generateInterestColumn = () => {
    if (this.state.activeInterest === null) {
      return "Loading..."
    } else if (this.state.activeInterest === undefined) {
      return "An interest profile has not been generated for this client yet"
    } else if (this.state.activeInterest) {
      return `This Client is interested in ${this.state.activeInterest}` 
    }
  }
  
  updateClientPreferences = (interest) => {
    cookieParser.setItem('contentFocus', interest)
    this.setState({
      activeInterest: interest
    })
  }

  renderInteractionMenu = () => {
    return this.state.interestArray.map(interest => {
    	return (
	      <div onClick={() => this.updateClientPreferences(interest)} className={`interest-window${(this.state.activeInterest === interest) ? '' : ' active-interest'}`}>
	      	<img className='interest-image' src={`/${interest}.jpg`} />
	      </div>
      	)
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {this.generateInterestColumn()}
          </p>
          <div className='responsive-flex'>
            {this.renderInteractionMenu()}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
