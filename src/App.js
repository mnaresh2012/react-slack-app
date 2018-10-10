import React, { Component } from 'react';
import EntryScreen from './components/EntryScreen';
import MainScreen from './MainScreen';
import { connect } from 'react-redux';

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUserName: this.getUserAndScreen().username || '',
      currentScreen: this.getUserAndScreen().screenname || ''
    } 
  }
    
  onSubmit(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(response => {
        this.setState({
          currentUserName: username,
          currentScreen: 'MainScreen'
        })
        this.setUserAndScreen(username, 'MainScreen');
      })
      .catch(error => console.error('error', error))
  }
  setUserAndScreen(username, screenname){
      localStorage.setItem('currentUserName', username);
      localStorage.setItem('currentScreen', screenname);
  }
  getUserAndScreen(){
      const username = localStorage.getItem('currentUserName');
      const screenname = localStorage.getItem('currentScreen');
      return {username, screenname}
  }
  onLogout(){
    this.props.dispatch({type: 'USER_LOGOUT'});
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentScreen');
    window.location.reload();
  }
  render() {
    if (this.state.currentScreen === '') {
      return <EntryScreen onSubmit={this.onSubmit.bind(this)} />
    }
    if (this.state.currentScreen === 'MainScreen') {
      return <MainScreen username={this.state.currentUserName} onLogout = {this.onLogout.bind(this)}/>
    }
  }
}

const mapStateToProps = (state) => ({
  currentScreen: state.currentScreen,
  currentUsername : state.currentUserName
});

export default connect(mapStateToProps) (App);
