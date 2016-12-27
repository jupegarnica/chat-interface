import React, {Component} from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import Logger from 'redux-logger'
import {Chat} from './chat.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; //material-ui dependency

const initialmessagesHistory = [
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
];
const initialState = {
    messagesHistory: initialmessagesHistory,
    theme: 'black'
}

// Reducer:  Pure function and inmutable state aproach
function chatReducer(state = initialState, action) {
    switch (action.type) {
        case 'sendMessage':
            return {
                ...state,
                messagesHistory: [
                    ...state.messagesHistory,
                    action.payload
                ]
            }
        case 'changeTheme':
            document.body.classList.add(action.payload);
            return {
                ...state,
                theme: action.payload
            }
        default:
            return state
    }
}

// Store
const store = createStore(chatReducer, initialState, applyMiddleware(Logger()))

//changeTheme trigger

//action
const changeTheme = (theme) => {
    return {type: 'changeTheme', payload: theme};
}

let theme = window.location.search.match(/bg=[^&]*/)[0].split('bg=').join('').split('&').join('');
store.dispatch(changeTheme(theme))

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
