import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = {
  container : {
      margin: '3em auto',
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
      height: '200px',
      textAlign: 'center'
  },
  header : {
    fontSize: '20px',
    color: '#2196f3',
    margin: '0 0 60px'
  },
  submit : {
      marginLeft: '10px',
      background: '#2196f3',
      color: '#fff'
  },
  reactLogo : {
    display: 'inline-block',
    margin: '0 auto',
    width: '200px'
  },
  username : {
    marginTop: '25px'
  }
};

class EntryScreen extends Component {
  constructor(props) {
    super(props)
      this.state = {
      username: ''
    } 
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  onNameChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (   
      <div style={styles.container}>
          <img alt='react logo' style = {styles.reactLogo} src='https://cdn.auth0.com/blog/react-js/react.png'/>
          <h1>React Chat Application. </h1>
          <form onSubmit={this.onSubmit.bind(this)} style = {styles.username} >
              <Input id="name" label="Username"
                  onChange={this.onNameChange.bind(this)} margin="normal"
                  placeholder = "Enter your Username" />
                  <Button style = {styles.submitButton} onClick={this.onSubmit.bind(this)} color>
                      Login
                  </Button> 
          </form>
      </div>
    )
  }
}

export default EntryScreen;
