import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import MembersList from './components/MembersList';
import ChannelList from './components/ChannelList';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PersonAdd from '@material-ui/icons/PersonAdd';

class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentChannel: {},
            messages: [],
            members: [],
            channels:[],
            channelName:'',
            channelPrivacy:false
        }
        
        this.chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:e24fa315-6c03-4b1c-a107-7e510721e3b3',
            userId: this.props.username,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate',
            }),
        })
    }

    sendMessage(msg) {
        this.state.currentUser.sendMessage({
            text: msg,
            roomId: this.state.currentChannel.id,
        })
    }

    componentDidMount() {
        this.chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser });
                this.setState({members:currentUser.users});
                currentUser.getJoinableRooms()
                    .then(rooms => {
                        const channels = [...this.state.channels, ...rooms, ...currentUser.rooms]
                        this.setState({channels: channels});
                    })
                    .catch(err => {
                        console.log(`Error getting joinable rooms: ${err}`)
                    })
                return currentUser.subscribeToRoom({
                    roomId: 15497622,
                    messageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            })
                        },
                     
                    },
                })
                
            })
            .then(currentChannel => {
                this.setState({ currentChannel })
            })
            .catch(error => console.error('error', error))
          
    }
    refreshMembersList(channelId){
        const currentChannel = this.state.channels.filter(function (channel) { return channel.id === channelId; });
        this.setState({
            members: currentChannel[0].userIds
        })
    }
    onChannelChange(channelId) {
        this.setState({currentMemberId: ''})
        const currentChannel = this.state.channels.filter(function (channel) { return channel.id === channelId; });
        this.setState({currentRoomId : channelId });
        this.setState({currentChannel : currentChannel[0] });
        
        this.setState({messages: [] })
        this.chatManager
        .connect()
        .then(currentUser => {
            this.setState({ currentUser })
            this.setState({ channels: currentUser.rooms });
            return currentUser.fetchMessages({
                roomId: channelId,
            }).then(messages => {
                this.setState({messages: messages })
              })
              .catch(err => {
                console.log(`Error : ${err}`)
              })
        })
        .catch(error => console.error('error', error))

        return this.state.currentUser.subscribeToRoom({
            roomId: channelId,
            messageLimit: 100,
            hooks: {
                onNewMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message],
                    })
                },
                
            },
        })
    }
    onChangeChannelText(e) {
        this.setState({ channelName: e.target.value })
    }

    handleChannelType(evt, isChecked) {
        this.setState({ channelPrivacy: isChecked })
    }

    onEnterChannel(e) {
        if(e.keyCode === 13) {
            this.createChannel(this.state.channelName, this.state.channelPrivacy);
        }
    }
    createChannel(channelName, isSecured=false, individual=false) {
        const users = this.state.currentUser.users.map((user) =>{
            if (user.id !== this.state.currentUser.id) {
                return user.id
            }
        })
        this.state.currentUser
                .createRoom({
                name: channelName,
                private: isSecured
            }).then(room => {
                if (!individual) {
                    this.setState({ channelName: '' })
                    this.setState({ channels: [...this.state.channels, room] });
                } else {
                    return room.id;
                }
            })
            .catch(err => {
                console.log(`Error : ${err}`)
            })
    }
    
    onLogout(evt){
       evt.preventDefault();
       this.props.onLogout();
    }
    onClickAdd(){
        this.setState({
            isAddUserClick: true,
            userAdded: ''
        })
    }
    onUserChange(e) {
        this.setState({ userAdded: e.target.value })
    }

    userAddedToChannel(e) {
        if(e.keyCode === 13) {
            if (this.state.userAdded) {
                this.setState({isAddUserClick: false});
                this.state.currentUser.addUserToRoom({
                    userId: this.state.userAdded,
                    roomId: this.state.currentChannel.id
                })
                .catch(err => {console.log(`Error : ${err}`)
                })
              
            } else {
                this.setState({isAddUserClick: false});
            }
        }
    }
    render() {
        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            },
            chatContainer: {
                display: 'flex',
                flex: 1,
            },
            leftPanel: {
                width: '250px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2d303a',
                color: 'white',
                textTransform: 'uppercase',
                logout: {
                    cursor: 'pointer',
                    float: 'right',
                    fontSize: 12
                },
                welcome: {
                    marginTop: 15,
                    marginBottom: 5
                }
            },
            rightPanelContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column',
                header:{
                    borderBottom: '1px solid #000'
                },
                section: {
                    display: 'flex',
                    backgroundColor: '#2c3333',
                    padding: 2
                },
                title: {
                    display:'inline-block',
                    marginLeft: '10px'
                },
                addUserContainer: {
                    display:'inline-block',
                    float:'right',
                    cursor: 'pointer',
                    color: 'green'
                },
                logoutContainer:{
                    display:'inline-block',
                    float:'right',
                    cursor: 'pointer',
                    marginRight: '10px',
                    color: 'red'
                }
            },
            Input:{
                color: '#FFFFF'
            }
        }

        return (
            <div style={styles.container}>
                <div style={styles.chatContainer}>
                    <aside style={styles.leftPanel}>
                    {this.state.currentUser.name ? 
                            <div>
                                <h3 style={styles.leftPanel.welcome}>
                            Hello: {this.state.currentUser.name}
                            <a style={styles.leftPanel.logout} onClick={this.onLogout.bind(this)}>Logout</a>
                        </h3></div> : '' }
                          { this.state.members.length > 0 ? 
                                <MembersList members={this.state.members} currentMemberId={this.state.currentMemberId} />
                                : ''}
                        
                     
                            { this.state.channels.length > 0 ? 
                                <ChannelList channels={this.state.channels} currentChannelId={this.state.currentRoomId} onChannelChange={this.onChannelChange.bind(this)} />
                                : ''}
                       <div>
                            <FormControl>
                                <Input style={styles.Input} placeholder="Create a Channel"   
                                value={this.state.channelName}
                                onKeyDown={this.onEnterChannel.bind(this)}
                                onChange={this.onChangeChannelText.bind(this)} />
                            </FormControl>
                            <FormControlLabel control={
                            <Checkbox  onChange={this.handleChannelType.bind(this)} value="checked" />} />
                        </div>
                    </aside>
                    <section style={styles.rightPanelContainer}>
                    <div style={styles.rightPanelContainer.header}>
                          <h3 style={styles.rightPanelContainer.title}>{this.state.currentChannel.name}</h3>
                          
                            <div style={styles.rightPanelContainer.addUserContainer} onClick={this.onClickAdd.bind(this)}>
                                {this.state.isAddUserClick ? 
                                    <FormControl>
                                        <Input placeholder="Add user to Chat Room"   
                                        value={this.state.addusername}
                                        onKeyDown={this.userAddedToChannel.bind(this)}
                                        onChange={this.onUserChange.bind(this)} />
                                    </FormControl> : <PersonAdd /> }    
                            </div>
                            
                      </div>
                        <MessageList
                            messages={this.state.messages}
                            style={styles.chatList}
                        />
                       <SendMessageForm
                            onSubmit={this.sendMessage.bind(this)}
                        />
                    </section>
                </div>
            </div>
        )
    }
}
export default ChatScreen;
