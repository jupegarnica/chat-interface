import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Chat from './chat.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; //material-ui dependency
import {store,changeThemeAction} from './redux.js';

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
