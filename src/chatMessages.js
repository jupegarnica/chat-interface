import React, {Component} from 'react';
import ChatMessage from './chatMessage';
let intervalID;
export default class ChatMessages extends Component {
    constructor(props) {
        super();
        window.addEventListener("resize", this.runAutoScrollDown.bind(this));
    }
    componentDidUpdate(){
        this.runAutoScrollDown();
    }
    runAutoScrollDown(){
        const element = this.autoScrollDown;
        element.scrollTop = element.scrollHeight;
    }
    onUpdateText(){
        if (!intervalID) {
            this.runAutoScrollDown();
            intervalID = setInterval(this.runAutoScrollDown.bind(this), 200);
        }
    }
    onTypingDone(){
        clearInterval(intervalID);
        intervalID = null;
    }
    render() {
        const lastMessange = this.props.messages.length -1;
        const history = this.props.messages.map((el, i) => <ChatMessage animate={i === lastMessange} key={i} onTypingDone={this.onTypingDone.bind(this)} onUpdateText={this.onUpdateText.bind(this)} content={el.content} me={el.user === 'me'}/>);
        return (
            <div className="chat-messages" ref={(input) => { this.autoScrollDown = input }}>
                <div className="chat-messages-wraper">
                    {history}
                </div>
            </div>
        );
    }
}
