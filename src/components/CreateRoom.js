import React, { Component } from 'react';

class CreateRoom extends Component {
constructor(props) {
   super(props)
   this.state = {
     username: '',
     roomname: ''
   }
   this.onSubmit = this.onSubmit.bind(this);
   this.onChange = this.onChange.bind(this);
 }

 onSubmit(e) {
   e.preventDefault()
   this.props.onSubmit({
       username : this.state.username,
       roomname : this.state.roomname
   })
 }

 onChange(e) {
    this.setState({ teamname: e.target.value });
  }

 render() {
  return (
      <div>
        <div>
          <h2>Create Room</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Enter Room name"
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

 export default CreateRoom;
