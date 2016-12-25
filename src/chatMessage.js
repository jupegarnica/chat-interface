import React, {Component} from 'react';
import Typist from 'react-typist';

export default class ChatMessage extends Component {
    render() {
        const cursor = {
            show: false,
            blink: true,
            element: '|',
            hideWhenDone: true,
            hideWhenDoneDelay: 0
        }
        let user = this.props.me
            ? 'me'
            : 'you';
        let content = this.props.animate ?
            (<Typist delayGenerator={this.props.onUpdateText} onTypingDone={this.props.onTypingDone} cursor={cursor} avgTypingDelay={1} stdTypingDelay={500} className="bubble">
                {this.props.content}
            </Typist>)
            :
            (<div className="bubble">
                {this.props.content}
            </div>)
        return (
            <div className={'chat-message ' + user}>
                {content}
            </div>
        );
    }
}
