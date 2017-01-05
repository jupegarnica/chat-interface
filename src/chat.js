import React, {Component} from 'react';
import './chat.css';
import ChatMessages from './chatMessages';
import ChatInputText from './chatInputText';
import ChatInputSelect from './chatInputSelect';
import {connect} from 'react-redux';
import {stateToProps, dispatchToProps} from './redux';

class Chat extends Component {
    render() {
        const {input} = this.props.state;
        let chatInput;
        if (input.type === 'select' && typeof input.options === 'object' && input.options.length) {
            chatInput = (<ChatInputSelect/>)
        } else {
            chatInput = (<ChatInputText/>)
        }
        return (
            <div className={'chat-wrapper ' + this.props.state.layout}>
                <ChatMessages/> {chatInput}
            </div>
        )

    }
}
export default connect(stateToProps, dispatchToProps)(Chat);
