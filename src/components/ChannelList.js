import React, { Component } from 'react';

class ChannelList extends Component {
    changeChannel(evt) {
        this.props.onChannelChange(evt.target.value);
    }
    render() {
        const styles = {
            container: {
                flex: 1
            },
            margin:{
                marginTop: '10px',
                marginBottom: '20px'
            },
            ul: {
                listStyle: 'none',
                marginTop: 5
            },
            li: {
                marginBottom: 5,
                color: 'lightblue',
                cursor: 'pointer'
            }
        }
        return (
            <div style={styles.margin}>
                <h4> Channels </h4>
                <hr/>
                <ul style={styles.ul}>
                    {this.props.channels.map((channel) => (
                        <li key={channel.id} value={channel.id} style={styles.li}
                            className={this.props.currentChannelId === channel.id ? 'active' : ''}
                            onClick={this.changeChannel.bind(this)}>
                            # {channel.name}
                            { channel.isPrivate ? ' (Private)' : ' (Public)' }
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default ChannelList;
