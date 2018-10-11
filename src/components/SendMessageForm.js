import React, { Component } from 'react';

class SendMessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.messageTxt);
        this.setState({ messageTxt: '' });
    }
    onChange(e) {
        this.setState({ messageTxt: e.target.value });
    }
    render() {
        const styles = {
            container: {
                padding: 20,
                borderTop: '1px #000 solid'
            },
            form: {
                display: 'flex',
            },
            input: {
                color: 'inherit',
                background: 'none',
                outline: 'none',
                border: 'none',
                flex: 1,
                fontSize: 16
            },
        }
        return (
            <div style={styles.container}>
                <div>
                    <form onSubmit={this.onSubmit.bind(this)} style={styles.form}>
                        <input type="text" placeholder="Your Message"
                            onChange={this.onChange.bind(this)}
                            value={this.state.messageTxt} style={styles.input}
                        />
                    </form>
                </div>
            </div>)
    }
} 

export default SendMessageForm;
