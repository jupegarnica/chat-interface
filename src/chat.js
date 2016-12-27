import React, {Component} from 'react';
import './chat.css';
import ChatMessages from './chatMessages';
import {connect} from 'react-redux';

class ChatComp extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div className="chat-wrapper">
                <ChatMessages messages={this.props.messagesHistory}/>
                <ChatInput handleInput={this.props.sendMessage}/>
            </div>
        );
    }
}

// Actions
const sendMessage = (msg) => {
    return {type: 'sendMessage', payload: msg};
}

// Map Redux state to component props
const mapStateToProps = (state) => {
    return {messagesHistory: state.messagesHistory}
}

// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (msg) => dispatch(sendMessage(msg))
    }
}

// Connected Component
export const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatComp)

import ContentSend from 'material-ui/svg-icons/content/send';
const defaultState = {
    text: 'type...',
    showSendIcon: false
}
class ChatInput extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }
    sendMessage(e) {
        e.preventDefault();
        this.textInputElement.blur();
        document.body.focus();
        const content = this.textInputElement.innerText;
        const msg = {
            type: 'text',
            content,
            user: 'me'
        }
        this.props.handleInput(msg);
        this.textInputElement.innerText = defaultState.text;
        this.setState({showSendIcon: false})
        this.chatInputElement.classList.add('goTransparent');
        setTimeout(() => this.chatInputElement.classList.remove('goTransparent'), 1000)
    }
    onFocus(e) {
        function selectElemText(elem) {
            var range = document.createRange();
            range.selectNodeContents(elem);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        };
        selectElemText(e.target);
    }
    onKeyDown(e) {
        if (e.key === 'Enter') {
            this.sendMessage(e);
        }
        if (!this.state.showSendIcon) {
            this.setState({showSendIcon: true})
        }
    }
    render() {
        return (
            <div className="chat-input " ref={(el) => this.chatInputElement = el} onKeyDown={this.onKeyDown.bind(this)}>
                <div className="text-input-wraper bubble thinking">
                    <div ref={(el) => this.textInputElement = el} suppressContentEditableWarning contentEditable onFocus={this.onFocus.bind(this)} className="text-input">
                        {this.state.text}
                    </div>

                </div>
                <div hidden={!this.state.showSendIcon} className="sendIcon">
                    <ContentSend onClick={this.sendMessage.bind(this)}/>
                </div>
            </div>
        );
    }
}
