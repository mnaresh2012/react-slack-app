import React, { Component } from 'react';

class MembersList extends Component {
    render() {
        const styles = {
            container: {
                flex: 1
            },
            ul: {
                margin: 25
            },
            heading: {
                margin: '5px',
                borderBottom: '2px solid #fff'
            },
            li: {
                marginBottom: 5,
                color: 'white',
                cursor: 'pointer'
            }
        }
        return (
            <div>
                <h4 style = {styles.heading}>Users List:</h4>
                <ul style={styles.ul}>
                    {this.props.members.map((member) => (
                        <li key={member.id} value={member.id} style={styles.li}
                            className={this.props.currentMemberId === member.id ? 'active' : ''}
                            >
                            {member.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default MembersList;
