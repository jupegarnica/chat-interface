import React, {Component} from 'react';
import ChatMessage from './chatMessage';
let intervalID;
export default class ChatMessages extends Component {
    constructor(props) {
        super();
        this.state = {
            messagesHistory: props.messagesHistory
        }
    }
    // componentDidUpdate(){
    //     this.runAutoScrollDown();
    //     setInterval(this.runAutoScrollDown, 100);
    // }
    runAutoScrollDown(){
        const element = this.autoScrollDown;
        element.scrollTop = element.scrollHeight;
    }
    onUpdateText(){
        if (!intervalID) {
            intervalID = setInterval(this.runAutoScrollDown.bind(this), 400);
        }

    }
    onTypingDone(){
        clearInterval(intervalID);
        intervalID = null;
    }
    render() {
        const history = this.state.messagesHistory.map((el) => <ChatMessage onTypingDone={this.onTypingDone.bind(this)} onUpdateText={this.onUpdateText.bind(this)} content={el.content} me={el.user === 'me'}/>);
        return (
            <div className="chat-messages" ref={(input) => { this.autoScrollDown = input }}>
                <div className="chat-messages-wraper">
                    {history}
                </div>
            </div>
        );
    }
}
