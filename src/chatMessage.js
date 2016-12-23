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
        return (
            <div className={'chat-message ' + user}>
                <Typist delayGenerator={this.props.typingDone} cursor={cursor} avgTypingDelay={10} className="bubble">
                    {this.props.content}
                </Typist>
            </div>
        );
    }
}
