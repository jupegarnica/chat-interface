import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Chat from './chat.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; //material-ui dependency
import {store,changeThemeAction,sendMessageAction} from './redux.js';
import Bot from './bot';

const bot = new Bot({
    sendMessageFn: sendMessageAction,
    listenFromFn: store.subscribe,
    questions: [
        {
            type: 'text',
            content: 'Hola, como te llamas?',
            validatePattern: /^[A-Z]/,
            invalidReply: '¿Sin mayuscula?, escríbelo bien please',
            nameToSave: 'name'
        },
        {
            type: 'text',
            content: 'email?',
            validatePattern: /.*@.*\./,
            invalidReply: 'no parece un email',
            nameToSave: 'name'
        }
    ]
})

// triggers
//changeThemeAction
let search = window.location.search.match(/bg=[^&]*/);

let theme = search && search.length ? search[0].split('bg=').join('').split('&').join('') : '';
theme && store.dispatch(changeThemeAction(theme));

// React component
class ChatShellComp extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <Chat/>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

export default ChatShellComp;
