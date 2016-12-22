import React, {Component} from 'react';
import Typist from 'react-typist';

export default class ChatMessage extends Component {
    render() {
        let user = this.props.me ? 'me' : 'you';
        return (
            <div className={'chat-message ' + user} >
                <Typist className="inner-message">
                    {this.props.content}
                </Typist>
            </div>
        );
    }
}
