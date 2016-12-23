import React, {Component} from 'react';
import ChatMessage from './chatMessage';

export default class ChatMessages extends Component {
    constructor(props) {
        super();
        this.state = {
            messagesHistory: props.messagesHistory
        }
    }
    componentDidUpdate(){
        this.runAutoScrollDown();
    }
    runAutoScrollDown(){
        const element = this.autoScrollDown;
        element.scrollTop = element.scrollHeight;
    }
    render() {
        const history = this.state.messagesHistory.map((el) => <ChatMessage typingDone={this.runAutoScrollDown.bind(this)} content={el.content} me={el.user === 'me'}/>);
        return (
            <div className="chat-messages" ref={(input) => { this.autoScrollDown = input }}>
                <div className="chat-messages-wraper">
                    {history}
                </div>
            </div>
        );
    }
}
