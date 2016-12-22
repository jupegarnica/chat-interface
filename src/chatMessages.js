import React, {Component} from 'react';
import ChatMessage from './chatMessage';
import './chatMessages.css';

export default class ChatMessages extends Component {
    constructor() {
        super();
        this.state = {
            messagesHistory: []
        }
    }
    componentDidMount() {
        this.setState({
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
        })
    }
    render() {
        const history = this.state.messagesHistory.map((el) => <ChatMessage content={el.content} me={el.user === 'me'}/>);
        console.log(history);
        return (
            <div className="chat-messages">
                {history}
            </div>
        );
    }
}
