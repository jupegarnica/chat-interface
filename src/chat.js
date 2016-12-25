import React, {Component} from 'react';
import './chat.css';
import ChatMessages from './chatMessages';

export default class Chat extends Component {
    constructor() {
        super();
        if (window.location.search.match(/bg=./)) {
            let bg = window.location.search.split('bg=').join('').split('?').join('');
            document.body.classList.add(bg)

        }
        this.state = {
            messagesHistory: [
                {
                    type: 'text',
                    content: 'hola',
                    user: 'me'
                }, {
                    type: 'text',
                    content: 'LoremLorem ipsum dolor sit amet, consectetur adipisicing elit, ',
                    user: 'john doe'
                }, {
                    type: 'text',
                    content: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    user: 'me'
                }, {
                    type: 'text',
                    content: ':)',
                    user: 'john'
                }
            ]
        };
    }
    printNewMessage(msg) {
        const newHistory = this.state.messagesHistory;
        newHistory.push(msg);
        this.setState({messagesHistory: newHistory});
    }
    render() {
        return (
            <div className="chat-wrapper">
                <ChatMessages messagesHistory={this.state.messagesHistory}/>
                <ChatInput handleInput={this.printNewMessage.bind(this)}/>
            </div>
        );
    }
}


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
        this.setState({
            showSendIcon: false
        })
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
    onKeyDown(e){
        if (e.key === 'Enter') {
            this.sendMessage(e);
        }
        if (!this.state.showSendIcon) {
            this.setState({
                showSendIcon: true
            })
        }
    }
    render() {
        return (
            <div className="chat-input " ref={(el) => this.chatInputElement = el} onKeyDown={this.onKeyDown.bind(this)}>
                <div className="text-input-wraper bubble thinking">
                    <div ref={(el) => this.textInputElement = el} suppressContentEditableWarning contentEditable  onFocus={this.onFocus.bind(this)} className="text-input">
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
